import React, {useEffect, useCallback, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import {searching as searchingSymbol} from '../../store/reducers/light'

import CameraIcon from './CameraIcon'
import QRIcon from './QRIcon'
import settingsIcon from './settingsIcon.png'

import {title, explination, description, prompt, step, icon, instruction, bold, noBreak, code, cameraIcon, qrIcon, settingsIcon as settingsIconStyle} from './style'

export default () => {
  const macRef = useRef()
  const dispatch = useDispatch()
  const mapState = useCallback(state => ({
    searching: state.light.status === searchingSymbol,
    searchCount: state.light.searchCount,
    mac: state.metadata.mac
  }))

  const {searching, searchCount, mac} = useMappedState(mapState)

  const formattedMACAddress = [...mac].reduce((string, value, index, array, lastValue=array[index - 1] || '', colon=index === array.length - 1 ? '' : ':') => (index % 2) ? `${string}${lastValue}${value}${colon}` : string, '')

  const statusMessage =
    searching
    ? 'Looking for your light'
    : searchCount >= 4
      ? `Hmmm, can't seem to find your light. Is it connected?`
      : `It's time to turn your light on!`

  useEffect(() => {
    const timeout = 5000
    const handler = () => {
      clearTimeout(scanTimer)
      scanTimer = setTimeout(handler, timeout)
      if(!document.hidden) dispatch({type: 'LIGHT_ONLINE_CHECK'})
    }

    let scanTimer = setTimeout(handler, timeout)
    document.addEventListener('visibilitychange', handler)

    return () => {
      clearTimeout(scanTimer)
      document.removeEventListener('visibilitychange', handler)
    }
  }, [])

  useEffect(() => {
    const {current: macElement} = macRef

    const handler = event => event.stopPropagation()

    macElement.addEventListener('touchstart', handler)
    return () => macElement.removeEventListener('touchstart', handler)
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
          <p>If your WiFi network requires you to whitelist MAC addresses, use <code ref={macRef} className={code}>{formattedMACAddress}</code></p>
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
