import React, {createRef, useEffect} from 'react'
import {useDispatch} from 'redux-react-hook'

import parseQRCode from '../../store/actions/parseQRCode'

import QrScanner from '../../QrScanner'

import {container, overlay, video} from './style'

export default () => {
  const videoRef = createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const tmp = videoRef.current.play

    videoRef.current.play = () => true
    videoRef.current.specialPlay = tmp

    const qrScanner = new QrScanner(videoRef.current, result => parseQRCode(dispatch, result));
    qrScanner.start();
  })

  return (
    <section className={container}>
      <section className={overlay} />
      <video ref={videoRef} muted autoPlay playsInline className={video} />
    </section>
)
}
