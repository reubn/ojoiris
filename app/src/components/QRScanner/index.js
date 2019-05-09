import React, {useRef, useEffect, useCallback} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import {scanning, success, fail} from '../../store/reducers/qr'

import loadQrScanner from './loadQrScanner'

import {container, overlay, instructions, video, pulseSuccess, pulseScanning, pulseFail} from './style'

export default () => {
  const videoRef = useRef()
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

  useEffect(loadQrScanner({videoRef, dispatch}), [])

  return (
    <section className={container}>
      <section className={overlay}>
      <style>{`.${overlay}:after{animation-name: ${overlayAnimation}}`}</style>
        <p className={instructions}>{instruction}</p>
      </section>
      <video ref={videoRef} muted playsInline className={video} />
    </section>
)
}
