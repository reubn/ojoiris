import React, {useRef, useEffect, useState} from 'react'
import classnames from 'classnames'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncPropsToState from './syncPropsToState'
import syncStateToOnChange from './syncStateToOnChange'
import syncStateToPortal from './syncStateToPortal'
import keepStill from './keepStill'

import BrightnessIcon from './BrightnessIcon'

import {outerCircle, container, innerMaskingCircle, innerIndicatorCircle, indicatorMaskingCircle, portal, active as activeStyle, disabled} from './style'


export default ({hue: hueProp=0, enabled: enabledProp=false, onChange}) => {
  const containerRef = useRef(), outerCircleRef = useRef(), innerCircleRef = useRef(), portalRef = useRef()

  const [hue, setHue] = useState(hueProp)
  const [enabled, setEnabled] = useState(enabledProp)
  const [realEvent, setRealEvent] = useState(false)

  const [active, setActive] = useState(false)
  const [portalPosition, setPortalPosition] = useState({left: null, bottom: null})

  useEffect(syncPropsToState({setRealEvent, setHue, hueProp, setEnabled, enabledProp}), [hueProp, enabledProp])
  useEffect(syncStateToOnChange({realEvent, onChange, hue, enabled}), [hue, enabled])
  useEffect(syncStateToPortal({outerCircleRef, innerCircleRef, hue, setPortalPosition}), [hue])

  useEffect(keepStill(containerRef), [])

  const touchOn = () => setActive(true)
  const touchOff = () => setActive(false)

  const handleTouch = touchHandler({outerCircleRef, innerCircleRef, portalRef, setHue, setRealEvent, touchOn, enabled})
  const handlePress = event => {
    setRealEvent(true)
    setEnabled(!enabled)
  }

  return (
    <>
      <section ref={containerRef} className={classnames(container, {[activeStyle]: active, [disabled]: !enabled})} onTouchStart={handleTouch} onTouchMove={handleTouch} onTouchEnd={touchOff}>
        <section ref={outerCircleRef} className={outerCircle}></section>
        <section ref={portalRef} className={portal} style={portalPosition}></section>
        <section ref={innerCircleRef} className={innerMaskingCircle}></section>
        <section className={innerIndicatorCircle} style={{background: `hsl(${hue}, 100%, 50%)`}}></section>
        <section className={indicatorMaskingCircle} onTouchEnd={handlePress}>
          <BrightnessIcon brightness={enabled ? 1 : 0} />
        </section>

      </section>
    </>
  )
}
