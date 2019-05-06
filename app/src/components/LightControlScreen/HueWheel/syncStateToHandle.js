import calculateSizing from './calculateSizing'

export default ({outerCircleRef, innerCircleRef, localColour, colourToAngle, setHandlePosition, side}) => () => {
  const {outerRadius, midlineRadius} = calculateSizing({outerCircleRef, innerCircleRef})

  const degrees = colourToAngle(localColour, side)
  const colourRadians = (degrees * Math.PI) / 180

  setHandlePosition({
    left: outerRadius + midlineRadius * Math.sin(colourRadians),
    bottom: outerRadius + midlineRadius * Math.cos(colourRadians),
    '--angle': `${degrees}deg`
  })
}
