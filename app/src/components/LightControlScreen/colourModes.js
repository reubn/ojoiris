import kelvinToRGB from '../../util/temperature/kelvinToRGB'
import RGBToKelvin from '../../util/temperature/RGBToKelvin'

import hsv2rgb from 'pure-color/convert/hsv2rgb'
import rgb2hsv from 'pure-color/convert/rgb2hsv'
import rgb2hsl from 'pure-color/convert/rgb2hsl'

export default {
  colour: {
    backgroundCSS: 'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
    colourToAngle: ({hue}) => hue / 255 * 360,
    angleToColour: angle => ({hue: angle / 360 * 255})
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
    }
  }
}
