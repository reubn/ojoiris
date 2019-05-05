import React, {useRef, useEffect, useState} from 'react'
import classnames from 'classnames'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncPropsToState from './syncPropsToState'
import syncStateToOnChange from './syncStateToOnChange'
import syncStateToHandle from './syncStateToHandle'
import keepStill from './keepStill'

import {outerCircle, container, innerMaskingCircle, innerIndicatorCircle, indicatorMaskingCircle, handle, active as activeStyle, disabled} from './style'


export default ({hue: hueProp=0, brightness: brightnessProp=0, enabled: enabledProp=false, onChange, children}) => {
  const containerRef = useRef(), outerCircleRef = useRef(), innerCircleRef = useRef(), handleRef = useRef()

  const [hue, setHue] = useState(hueProp / 255 * 360)
  const [enabled, setEnabled] = useState(enabledProp)
  const [realEvent, setRealEvent] = useState(false)

  const [active, setActive] = useState(false)
  const [handlePosition, setHandlePosition] = useState({left: null, bottom: null})

  useEffect(syncPropsToState({setRealEvent, setHue, hueProp, setEnabled, enabledProp, active}), [hueProp, enabledProp, active])
  useEffect(syncStateToOnChange({realEvent, onChange, hue, enabled}), [hue, enabled])
  useEffect(syncStateToHandle({outerCircleRef, innerCircleRef, hue, setHandlePosition}), [hue, enabled])

  useEffect(keepStill(containerRef), [])

  const touchOn = () => setActive(true)
  const touchOff = () => setActive(false)

  const handleTouch = touchHandler({outerCircleRef, innerCircleRef, handleRef, setHue, setRealEvent, touchOn, enabled})
  const handlePress = event => {
    setRealEvent(true)
    setEnabled(!enabled)
  }

  return (
    <>
      <section ref={containerRef} className={classnames(container, {[activeStyle]: active, [disabled]: !enabled})} onTouchStart={handleTouch} onTouchMove={handleTouch} onTouchEnd={touchOff}>
        <section ref={outerCircleRef} className={outerCircle}></section>
        <section ref={handleRef} className={handle} style={handlePosition}></section>

        <section ref={innerCircleRef} className={innerMaskingCircle}></section>

        <section className={innerIndicatorCircle} style={{background: `hsl(${hue}, 100%, ${50 * brightnessProp / 255}%)`}}></section>
        <section className={indicatorMaskingCircle} onTouchEnd={handlePress}>
          {children}
        </section>

      </section>
    </>
  )
}
