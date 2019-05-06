import React from 'react'
import classnames from 'classnames'

import {centre, ray} from './style'

export default ({colour: {value}}) => {
  const [minWidth, maxWidth] = [10.5, 46]
  const widthRange = maxWidth - minWidth

  const [maxMargin, minMargin] = [61.6, 25]
  const marginRange = maxMargin - minMargin

  const width = value / 255 * widthRange + minWidth
  const margin = (1 - value / 255) * marginRange + minMargin

  const style = {'--width': `${width}%`, '--margin': `${margin}%`}

  return (
    <section className={centre} style={style}>
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
