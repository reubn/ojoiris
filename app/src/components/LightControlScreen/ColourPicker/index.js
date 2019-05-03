import React, {useRef, useEffect, useState} from 'react'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncHuePropToHue from './syncHuePropToHue'
import syncHueToOnChange from './syncHueToOnChange'
import syncHueToPortal from './syncHueToPortal'
import keepStill from './keepStill'

import {outerCircle, container, innerMaskingCircle, innerIndicatorCircle, portal} from './style'


export default ({hue: hueProp=0, onChange}) => {
  const containerRef = useRef(), outerCircleRef = useRef(), innerCircleRef = useRef(), portalRef = useRef()

  const [hue, setHue] = useState(hueProp)
  const [realEvent, setRealEvent] = useState(false)
  const [portalPosition, setPortalPosition] = useState({left: null, bottom: null})

  useEffect(syncHuePropToHue({setRealEvent, setHue, hueProp}), [hueProp])
  useEffect(syncHueToOnChange({realEvent, onChange, hue}), [hue])
  useEffect(syncHueToPortal({outerCircleRef, innerCircleRef, hue, setPortalPosition}), [hue])

  useEffect(keepStill(containerRef), [])

  const handleTouch = touchHandler({outerCircleRef, innerCircleRef, portalRef, setHue, setRealEvent})

  return (
    <>
      <section ref={containerRef} className={container} onTouchStart={handleTouch} onTouchMove={handleTouch}>
        <section ref={outerCircleRef} className={outerCircle}></section>
        <section ref={innerCircleRef} className={innerMaskingCircle}></section>
        <section className={innerIndicatorCircle} style={{background: `hsl(${hue}, 100%, 50%)`}}></section>
        <section ref={portalRef} className={portal} style={portalPosition}></section>
      </section>
    </>
  )
}
