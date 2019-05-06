import React, {useRef, useEffect, useState} from 'react'
import classnames from 'classnames'

import colourToCSS from '../../../util/colourToCSS'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncPropsToState from './syncPropsToState'
import syncStateToOnChange from './syncStateToOnChange'
import syncStateToHandle from './syncStateToHandle'
import keepStill from './keepStill'

import {outerCircle, container, innerMaskingCircle, innerIndicatorCircle, indicatorMaskingCircle, handle, active as activeStyle, disabled} from './style'

export default ({colour, enabled: enabledProp, onChange, config: {backgroundCSS, colourToAngle, angleToColour}, children}) => {
  const containerRef = useRef(), outerCircleRef = useRef(), innerCircleRef = useRef(), handleRef = useRef()

  const [localColour, setLocalColour] = useState(colour)
  const [enabled, setEnabled] = useState(enabledProp)
  const [side, setSide] = useState(1)
  const [realEvent, setRealEvent] = useState(false)

  const [active, setActive] = useState(false)
  const [handlePosition, setHandlePosition] = useState({left: null, bottom: null})

  useEffect(syncPropsToState({setRealEvent, setLocalColour, colour, setEnabled, enabledProp, active}), [colour, enabledProp, active])
  useEffect(syncStateToOnChange({realEvent, onChange, localColour, enabled}), [localColour, enabled])
  useEffect(syncStateToHandle({outerCircleRef, innerCircleRef, localColour, colourToAngle, setHandlePosition, side}), [localColour])

  useEffect(keepStill(containerRef), [])

  const touchOn = () => setActive(true)
  const touchOff = () => setActive(false)

  const handleTouch = touchHandler({outerCircleRef, innerCircleRef, handleRef, localColour, setLocalColour, angleToColour, setRealEvent, touchOn, enabled, setSide})
  const handlePress = event => {
    setRealEvent(true)
    setEnabled(!enabled)
  }

  return (
    <>
      <section
       ref={containerRef}
       className={classnames(container, {[activeStyle]: active, [disabled]: !enabled})}
       onTouchStart={handleTouch}
       onTouchMove={handleTouch}
       onTouchEnd={touchOff}
      >
        <section ref={outerCircleRef} className={outerCircle} style={{background: backgroundCSS}}></section>
        <section ref={handleRef} className={handle} style={handlePosition}></section>

        <section ref={innerCircleRef} className={innerMaskingCircle}></section>

        <section className={innerIndicatorCircle} style={{background: colourToCSS(localColour)}}></section>
        <section className={indicatorMaskingCircle} onTouchEnd={handlePress}>
          {children}
        </section>

      </section>
    </>
  )
}
