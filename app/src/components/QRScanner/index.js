import React, {createRef, useEffect, useCallback} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import parseQRCode from '../../store/actions/parseQRCode'

import QrScanner from '../../QrScanner'

import {container, overlay, video} from './style'

export default () => {
  const videoRef = createRef()
  const dispatch = useDispatch()

  const mapState = useCallback(state => ({
    haveMetadata: !!state.metadata.id
  }), [])

  const {haveMetadata} = useMappedState(mapState);

  useEffect(() => {
    const tmp = videoRef.current.play

    videoRef.current.play = () => true
    videoRef.current.specialPlay = tmp

    const qrScanner = new QrScanner(videoRef.current, result => parseQRCode(dispatch, result) && qrScanner.destroy())

    qrScanner.start()
  })

  return (
    <section className={container}>
      <section className={overlay} />
      {!haveMetadata && <video ref={videoRef} muted autoPlay playsInline className={video} />}
    </section>
)
}
