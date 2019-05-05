import React, {useRef, useEffect, useState} from 'react'
import classnames from 'classnames'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncPropsToState from './syncPropsToState'
import syncStateToOnChange from './syncStateToOnChange'
import syncStateToHandle from './syncStateToHandle'
import keepStill from './keepStill'

import {container, handle, active as activeStyle, disabled} from './style'


export default ({hue, brightness: brightnessProp=0, enabled=false, onChange}) => {
  const containerRef = useRef(), handleRef = useRef()

  const [brightness, setBrightness] = useState(brightnessProp / 255)
  const [realEvent, setRealEvent] = useState(false)

  const [active, setActive] = useState(false)
  const [handlePosition, setHandlePosition] = useState({left: null})

  useEffect(syncPropsToState({setRealEvent, setBrightness, brightnessProp, active}), [brightnessProp, active])
  useEffect(syncStateToOnChange({realEvent, onChange, brightness}), [brightness])
  useEffect(syncStateToHandle({containerRef, brightness, setHandlePosition}), [brightness, enabled])

  useEffect(keepStill(containerRef), [])

  const touchOn = () => setActive(true)
  const touchOff = () => setActive(false)

  const handleTouch = touchHandler({containerRef, handleRef, setBrightness, setRealEvent, touchOn})


  return (
    <section ref={containerRef} style={{'--hue': `${hue / 255 * 360}deg`}} className={classnames(container, {[activeStyle]: active, [disabled]: !enabled})} onTouchStart={handleTouch} onTouchMove={handleTouch} onTouchEnd={touchOff}>
      <section ref={handleRef} className={handle} style={handlePosition}></section>
    </section>
  )
}
