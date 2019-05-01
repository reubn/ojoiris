import React, {createRef, useEffect, useState} from 'react'

import {outerCircle, container, innerMaskingCircle, innerIndicatorCircle, portal} from './style'

export default () => {
  const outerCircleRef = createRef()
  const innerCircleRef = createRef()
  const [hue, setHue] = useState(0)
  const [portalX, setPortalX] = useState(0)
  const [portalY, setPortalY] = useState(0)

  const handleTouch = event => {
    if(event.target !== outerCircleRef.current) return

    const {x: containerX, y: containerY, width: widthOuter, height: heightOuter} = outerCircleRef.current.getBoundingClientRect()
    const {width: widthInner, height: heightInner} = innerCircleRef.current.getBoundingClientRect()

    const [centerX, centerY] = [containerX + window.scrollX + (widthOuter / 2), containerY + window.scrollY + (heightOuter / 2)]
    const [outerRadius, innerRadius] = [widthOuter / 2, widthInner / 2]
    const midlineRadius = innerRadius + ((outerRadius - innerRadius) / 2)

    const {clientX: eventX, clientY: eventY} = event.touches[0]

    const [dx, dy] = [eventX - centerX, eventY - centerY]

    const raw = Math.atan2(dy, dx)
    const unnormalised = (raw / Math.PI) * 180
    const deg = (Math.round(unnormalised < 0 ? 360 + unnormalised : unnormalised) + 90) % 360


    const [x, y] = [centerX + midlineRadius * Math.sin(raw + 0.5 * Math.PI), centerY + midlineRadius * Math.cos(raw + 0.5 * Math.PI)]
    console.log({x, y, a: midlineRadius / 4})
    setHue(deg)
    setPortalX(x)
    setPortalY(y)
  }

  return (
    <>
      <section className={container} onTouchStart={handleTouch} onTouchMove={handleTouch}>
        <section ref={outerCircleRef} className={outerCircle}></section>
        <section ref={innerCircleRef} className={innerMaskingCircle}></section>
        <section className={innerIndicatorCircle} style={{background: `hsl(${hue}, 100%, 50%)`}}></section>
        <section className={portal} style={{left: portalX, bottom: portalY}}>5</section>
      </section>
    </>
  )
}
