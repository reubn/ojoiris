import calculateSizing from './calculateSizing'

export default ({containerRef, innerCircleRef, hue, setHandlePosition}) => () => {
  const {outerRadius, midlineRadius} = calculateSizing({containerRef, innerCircleRef})
  const colourRadians = (hue * Math.PI) / 180

  setHandlePosition({
    left: outerRadius + midlineRadius * Math.sin(colourRadians),
    bottom: outerRadius + midlineRadius * Math.cos(colourRadians),
    '--angle': `${hue}deg`
  })
}
