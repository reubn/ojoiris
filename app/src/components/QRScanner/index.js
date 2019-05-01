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

  const [overlayAnimation, instruction] = ({
    [scanning]: [pulseScanning, 'Scan the base of your light to activate'],
    [success]: [pulseSuccess, 'Light Activated'],
    [fail]: [pulseFail, 'Are you sure this is the right code?']
  })[status]

  useEffect(() => {
    const tmp = videoRef.current.play

    videoRef.current.play = () => true
    videoRef.current.specialPlay = tmp

    const qrScanner = new QrScanner(videoRef.current, result => parseQRCode(dispatch, result))

    qrScanner.start()

    return () => qrScanner.destroy()
  }, [])

  return (
    <section className={container}>
      <section className={overlay}>
      <style>{`.${overlay}:after{animation-name: ${overlayAnimation}}`}</style>
        <p className={instructions}>{instruction}</p>
      </section>
      <video ref={videoRef} muted autoPlay playsInline className={video} />
    </section>
)
}
