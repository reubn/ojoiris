import QrScannerWorker from 'worker-loader!./worker'

export default class QrScanner {
    static hasCamera() {
        // note that enumerateDevices can always be called and does not prompt the user for permission. However, device
        // labels are only readable if served via https and an active media stream exists or permanent permission is
        // given. That doesn't matter for us though as we don't require labels.
        return navigator.mediaDevices.enumerateDevices()
            .then(devices => devices.some(device => device.kind === 'videoinput'))
            .catch(() => false)
    }

    constructor(video, onDecode, canvasSize=400) {
        this.videoElement = video
        this.canvasElement = document.createElement('canvas')
        this.onDecode = onDecode
        this.active = false

        this.canvasElement.width = canvasSize
        this.canvasElement.height = canvasSize
        this.sourceRect = {
            x: 0,
            y: 0,
            width: canvasSize,
            height: canvasSize
        }

        this.onCanPlay = this.onCanPlay.bind(this)
        this.onPlay = this.onPlay.bind(this)
        this.onVisibilityChange = this.onVisibilityChange.bind(this)

        this.videoElement.addEventListener('canplay', this.onCanPlay)
        this.videoElement.addEventListener('play', this.onPlay)
        document.addEventListener('visibilitychange', this.onVisibilityChange)

        this.qrWorker = new QrScannerWorker()
    }

    destroy() {
        this.videoElement.removeEventListener('canplay', this.onCanPlay)
        this.videoElement.removeEventListener('play', this.onPlay)
        document.removeEventListener('visibilitychange', this.onVisibilityChange)

        this.stop()
        this.qrWorker.postMessage({type: 'close'})
    }


    start() {
        if(this.active) return Promise.resolve()
        if(window.location.protocol !== 'https:') console.warn('The camera stream is only accessible if the page is transferred via https.')

        this.active = true
        if(document.hidden) return Promise.resolve()

        this.offTimeout = clearTimeout(this.offTimeout)

        if(this.videoElement.srcObject) {
            // camera stream already/still set
            this.videoElement.play()
            return Promise.resolve()
        }

        let facingMode = 'environment'
        return this.getCameraStream(facingMode, true)
            .catch(() => {
                // we (probably) don't have an environment camera
                facingMode = 'user'
                return this.getCameraStream(facingMode) // throws if camera is not accessible (e.g. due to not https)
            })
            .then(stream => {
                this.videoElement.srcObject = stream
                this.setVideoMirror(facingMode)
            })
            .catch(e => {
                this.active = false
                throw e
            })
    }

    stop() {
        this.pause()
    }

    pause() {
        this.active = false

        if(!this.active) return
        this.videoElement.pause()

        if(this.offTimeout) return

        this.offTimeout = setTimeout(() => {
            const track = this.videoElement.srcObject && this.videoElement.srcObject.getTracks()[0]
            if(!track) return

            track.stop()
            this.videoElement.srcObject = null
            this.offTimeout = null
        }, 300)
    }


    scanImage() {
        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => onError('timeout'), 3000)

            const onMessage = event => {
                if(event.data.type !== 'scan') return

                this.qrWorker.removeEventListener('message', onMessage)
                this.qrWorker.removeEventListener('error', onError)

                timeout = clearTimeout(timeout)

                if(event.data.result) resolve(event.data.result)
                else reject()
            }

            const onError = event => {
                this.qrWorker.removeEventListener('message', onMessage)
                this.qrWorker.removeEventListener('error', onError)

                timeout = clearTimeout(timeout)

                const errorMessage = event ? (event.message || event) : 'Unknown Error'
                reject('Scanner error: ' + errorMessage)
            }

            this.qrWorker.addEventListener('message', onMessage)
            this.qrWorker.addEventListener('error', onError)

            const imageData = this.getImageData()
            this.qrWorker.postMessage({
                type: 'decode',
                data: imageData
            }, [imageData.data.buffer])
        })
    }

    onCanPlay() {
        this.updateSourceRect()
        this.videoElement.play()
    }

    onPlay() {
        this.updateSourceRect()
        this.scanFrame()
    }

    onVisibilityChange() {
        if(document.hidden) this.pause()
        else if(this.active) this.start()
    }

    updateSourceRect() {
        const smallestDimension = Math.min(this.videoElement.videoWidth, this.videoElement.videoHeight)
        const sourceRectSize = Math.round(2 / 3 * smallestDimension)

        this.sourceRect.width = this.sourceRect.height = sourceRectSize
        this.sourceRect.x = (this.videoElement.videoWidth - sourceRectSize) / 2
        this.sourceRect.y = (this.videoElement.videoHeight - sourceRectSize) / 2
    }

    scanFrame() {
        if(!this.active || this.videoElement.paused || this.videoElement.ended) return false

        // using requestAnimationFrame to avoid scanning if tab is in background
        requestAnimationFrame(() => {
            this.scanImage()
            .then(this.onDecode, error => error && console.error(error))
            .then(() => this.scanFrame())
        })
    }

    getCameraStream(facingMode, exact=false, constraints=[{facingMode: facingMode ? exact ? {exact: facingMode} : facingMode : undefined}]) {
        if(constraints.length === 0) return Promise.reject('Camera not found.')

        return navigator.mediaDevices.getUserMedia({
            video: constraints.shift()
        })
        .catch(() => this.getCameraStream(facingMode, exact, constraints))
    }

    setVideoMirror(facingMode) {
        // in user facing mode mirror the video to make it easier for the user to position the QR code
        const scaleFactor = facingMode === 'user' ? -1 : 1
        this.videoElement.style.transform = 'scaleX(' + scaleFactor + ')'
    }

    getImageData() {
        const context = this.canvasElement.getContext('2d', {alpha: false})
        context.imageSmoothingEnabled = false // gives less blurry images

        context.drawImage(this.videoElement, this.sourceRect.x, this.sourceRect.y, this.sourceRect.width, this.sourceRect.height, 0, 0, this.canvasElement.width, this.canvasElement.height)

        return context.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
    }
}
