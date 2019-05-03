import React from 'react'
import classnames from 'classnames'

import {on, off, centre, ray} from './style'

export default ({brightness}) => {
  const [minWidth, maxWidth] = [10.5, 46]
  const widthRange = maxWidth - minWidth

  const [maxMargin, minMargin] = [61.6, 25]
  const marginRange = maxMargin - minMargin

  const width = brightness * widthRange + minWidth
  const margin = (1 - brightness) * marginRange + minMargin

  const style = {'--width': `${width}%`, '--margin': `${margin}%`}

  return (
    <section className={classnames(centre, brightness ? on : off)} style={style}>
      <section className={ray}></section>
      <section className={ray}></section>
      <section className={ray}></section>
      <section className={ray}></section>
      <section className={ray}></section>
      <section className={ray}></section>
      <section className={ray}></section>
      <section className={ray}></section>
    </section>
  )
}
