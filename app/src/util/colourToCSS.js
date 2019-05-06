import hsv2hsl from 'pure-color/convert/hsv2hsl'

export default ({hue, saturation, value}) => {
  const [hueCSS, saturationCSS, lightness] = hsv2hsl([hue / 255 * 360, saturation / 255 * 100, value / 255 * 100])

  return `hsl(${hueCSS}deg, ${saturationCSS}%, ${lightness}%)`
}
