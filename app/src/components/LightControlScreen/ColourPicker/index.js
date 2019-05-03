import React, {useRef, useEffect, useState} from 'react'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncPropsToState from './syncPropsToState'
import syncStateToOnChange from './syncStateToOnChange'
import syncStateToPortal from './syncStateToPortal'
import keepStill from './keepStill'

import BrightnessIcon from './BrightnessIcon'

import {outerCircle, container, innerMaskingCircle, innerIndicatorCircle, indicatorMaskingCircle, portal} from './style'


export default ({hue: hueProp=0, enabled: enabledProp=false, onChange}) => {
  const containerRef = useRef(), outerCircleRef = useRef(), innerCircleRef = useRef(), portalRef = useRef()

  const [hue, setHue] = useState(hueProp)
  const [enabled, setEnabled] = useState(enabledProp)
  const [realEvent, setRealEvent] = useState(false)
  const [portalPosition, setPortalPosition] = useState({left: null, bottom: null})

  useEffect(syncPropsToState({setRealEvent, setHue, hueProp, setEnabled, enabledProp}), [hueProp, enabledProp])
  useEffect(syncStateToOnChange({realEvent, onChange, hue, enabled}), [hue, enabled])
  useEffect(syncStateToPortal({outerCircleRef, innerCircleRef, hue, setPortalPosition}), [hue])

  useEffect(keepStill(containerRef), [])

  const handleTouch = touchHandler({outerCircleRef, innerCircleRef, portalRef, setHue, setRealEvent})
  const handlePress = event => {
    setRealEvent(true)
    setEnabled(!enabled)
  }

  return (
    <>
      <section ref={containerRef} className={container} onTouchStart={handleTouch} onTouchMove={handleTouch}>
        <section ref={outerCircleRef} className={outerCircle}></section>
        <section ref={innerCircleRef} className={innerMaskingCircle}></section>
        <section className={innerIndicatorCircle} style={{background: `hsl(${hue}, 100%, 50%)`}}></section>
        <section className={indicatorMaskingCircle} onTouchStart={handlePress}>
          <BrightnessIcon brightness={enabled ? 1 : 0} />
        </section>
        <section ref={portalRef} className={portal} style={portalPosition}></section>
      </section>
    </>
  )
}
