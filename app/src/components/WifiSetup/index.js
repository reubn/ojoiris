import React, {useEffect, useCallback} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import {searching as searchingSymbol} from '../../store/reducers/light'

import CameraIcon from './CameraIcon'
import QRIcon from './QRIcon'
import settingsIcon from './settingsIcon.png'

import {title, explination, description, prompt, step, icon, instruction, bold, noBreak, code, cameraIcon, qrIcon, settingsIcon as settingsIconStyle} from './style'

export default () => {
  const dispatch = useDispatch()
  const mapState = useCallback(state => ({
    searching: state.light.status === searchingSymbol,
    searchCount: state.light.searchCount
  }))

  const {searching, searchCount} = useMappedState(mapState)

  const statusMessage =
    searching
    ? 'Looking for your light'
    : searchCount >= 3
      ? `Hmmm, can't seem to find your light`
      : `It's time to turn your light on!`

  useEffect(() => {
    const handler = () => !document.hidden && dispatch({type: 'LIGHT_ONLINE_CHECK'})

    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  return (
    <><section className={explination}>
    <h1 className={title}>WiFi</h1>
    <p className={description}>{statusMessage}</p>
  </section>
    <section className={prompt}>
      <section className={step}>
        <section className={instruction}>
          <p>Firstly, plug in your light using a <span className={noBreak}><span className={bold}>Micro USB</span> cable.</span> It should light up!</p>
          <p>If your WiFi network requires you to whitelist MAC addresses, use <code className={code}>80:7d:3a:6e:92:76</code></p>
        </section>
      </section>
      <section className={step}>
        <section className={icon}>
          <CameraIcon className={cameraIcon}/>
        </section>
        <section className={instruction}>
          <p>Next, open the <span className={bold}>Camera</span>, and point it at the base of your light</p>
        </section>
      </section>
      <section className={step}>
        <section className={icon}>
          <QRIcon className={qrIcon}/>
        </section>
        <section className={instruction}>
          <p>Tap on the notification that appears. Connect to the light's WiFi hotspot</p>
        </section>
      </section>
      <section className={step}>
        <section className={icon}>
          <img src={settingsIcon} className={settingsIconStyle}/>
        </section>
        <section className={instruction}>
          <p>Exit the Camera, and open <span className={bold}>Settings</span>, then <span className={bold}>WiFi</span></p>
        </section>
      </section>
      <section className={step}>
        <section className={instruction}>
          <p>When the page appears, tap <span className={bold}>Configure WiFi</span></p>
        </section>
      </section>
    </section>
    </>
  )
}
