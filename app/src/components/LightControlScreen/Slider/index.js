import React, {useRef, useEffect, useState} from 'react'
import classnames from 'classnames'

import colourToCSS from '../../../util/colourToCSS'
import keepStill from '../../../hooks/keepStill'

import calculateSizing from './calculateSizing'
import touchHandler from './touchHandler'
import syncPropsToState from './syncPropsToState'
import syncStateToOnChange from './syncStateToOnChange'
import syncStateToHandle from './syncStateToHandle'

import {container, handle, active as activeStyle, disabled} from './style'


export default ({colour, enabled=false, onChange, setBeingTouched, property, style}) => {
  const containerRef = useRef(), handleRef = useRef()

  const [value, setValue] = useState(colour.value / 255)
  const [realEvent, setRealEvent] = useState(false)

  const [active, setActive] = useState(false)
  const [handlePosition, setHandlePosition] = useState({left: null})

  useEffect(syncPropsToState({setRealEvent, setValue, colour, active, property}), [colour, active])
  useEffect(syncStateToOnChange({realEvent, onChange, value, property}), [value])
  useEffect(syncStateToHandle({containerRef, value, setHandlePosition}), [value, enabled])

  useEffect(keepStill(containerRef), [])

  const touchOn = () => setActive(true)
  const touchOff = () => setActive(false)

  const handleTouch = touchHandler({containerRef, handleRef, setValue, setRealEvent, touchOn})

  return (
    <section
     ref={containerRef}
     style={{...style, '--colour': colourToCSS({...colour, [property]: 255})}}
     className={classnames(container, {[activeStyle]: active, [disabled]: !enabled})}
     onTouchStart={handleTouch}
     onTouchMove={handleTouch}
     onTouchEnd={touchOff}
    >
      <section ref={handleRef} className={handle} style={handlePosition}></section>
    </section>
  )
}
