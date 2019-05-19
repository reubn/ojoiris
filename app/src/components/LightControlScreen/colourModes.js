import React from 'react'

import kelvinToRGB from '../../util/temperature/kelvinToRGB'
import RGBToKelvin from '../../util/temperature/RGBToKelvin'

import hsv2rgb from 'pure-color/convert/hsv2rgb'
import rgb2hsv from 'pure-color/convert/rgb2hsv'
import rgb2hsl from 'pure-color/convert/rgb2hsl'

export default {
  colour: {
    backgroundCSS: 'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
    colourToAngle: ({hue}, {angle}) => (angle || angle === 0) ? angle : (hue / 255 * 360),
    angleToColour: angle => ({hue: angle / 360 * 255}),
    Icon: props => (
      <svg {...props} viewBox="0 0 512 512">
        <path d="M430.1 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 12-36.6.1-47.7zM120 216c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm40 126c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm64-161c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm72 219c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm24-208c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" />
      </svg>
    )
  },
  white: {
    backgroundCSS: 'linear-gradient(to bottom, rgb(255, 111, 0), rgb(255, 154, 60), rgb(255, 184, 125), rgb(255, 207, 169), rgb(255, 226, 203), rgb(255, 242, 230), rgb(255, 251, 255), rgb(230, 235, 255), rgb(217, 227, 255), rgb(208, 222, 255))',
    colourToAngle: ({hue, saturation}, {angle, side}) => {
      if(angle || angle === 0) return angle // HACK - there will be 2 possible positions on circle - impossible to resolve ∴ just use event angle

      const [red, green, blue] = hsv2rgb([hue, saturation / 255 * 100, 100])
      const kelvin = Math.abs(RGBToKelvin([red, green, blue]))

      const position = (kelvin - 1550) / (10000 - 1550)
      return side === 2 ? 360 - position * 180 : position * 180
    },
    angleToColour: angle => {
      const rebased = (angle >= 180 ? 360 - angle : angle) / 180
      const kelvin = (10000 - 1550) * rebased + 1550

      const [red, green, blue] = kelvinToRGB(kelvin)
      const [hue, saturation] = rgb2hsv([red, green, blue])

      return {
        hue: hue / 360 * 255,
        saturation: saturation / 100 * 255
      }
    },
    Icon: props => (
      <svg {...props} viewBox="0 0 512 512">
        <path d="M309.8 304.6c-4.3-3-6.9-7.9-6.9-13.1v-213c0-25.7-21-46.5-47-46.5s-47 20.8-47 46.5v213c0 5.2-2.6 10.2-6.9 13.1-25.2 17.3-42 46.4-42 79.3 0 53 43 96 96 96s96-43 96-96c0-32.9-17-62.1-42.2-79.3zM256.1 445c-32 0-58.1-26.3-58.1-58.8 0-25.4 15.4-47.1 37.9-55.3 3.2-1.2 5.4-4.1 5.4-7.5V180.2c0-8 6.5-14.5 14.5-14.5s14.5 6.5 14.5 14.5v143.2c0 3.4 2.1 6.3 5.3 7.5 21.9 8.2 38.4 29.9 38.4 55.2 0 32.5-25.8 58.9-57.9 58.9z"/>
      </svg>
    )
  }
}
