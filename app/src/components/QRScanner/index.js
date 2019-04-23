import React, {createRef, useEffect, useCallback} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import parseQRCode from '../../store/actions/parseQRCode'

import {scanning, success, fail} from '../../store/reducers/qr'

import QrScanner from '../../QrScanner'

import {container, overlay, instructions, video, pulseSuccess, pulseScanning, pulseFail} from './style'

export default () => {
  const videoRef = createRef()
  const dispatch = useDispatch()

  const mapState = useCallback(state => ({
    status: state.qr
  }), [])

  const {status} = useMappedState(mapState);

  const overlayAnimation = ({
    [scanning]: pulseScanning,
    [success]: pulseSuccess,
    [fail]: pulseFail
  })[status]

  let res = true
  const qu = async result => {
    if(res === false) return
    res = false
    await parseQRCode(dispatch, result)
    res = true
  }

  useEffect(() => {
    const tmp = videoRef.current.play

    videoRef.current.play = () => true
    videoRef.current.specialPlay = tmp

    const qrScanner = new QrScanner(videoRef.current, qu)

    qrScanner.start()

    return () => qrScanner.destroy()
  }, [])

  return (
    <section className={container}>
      <section className={overlay}>
      <style>{`.${overlay}:after{animation-name: ${overlayAnimation}}`}</style>
        <p className={instructions}>Scan the base of your light to activate</p>
      </section>
      <video ref={videoRef} muted autoPlay playsInline className={video} />
    </section>
)
}
