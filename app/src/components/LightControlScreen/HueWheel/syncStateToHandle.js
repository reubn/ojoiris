import calculateSizing from './calculateSizing'

export default ({outerCircleRef, innerCircleRef, localColour, colourToAngle, setHandlePosition, eventInfo}) => () => {
  const {outerRadius, midlineRadius} = calculateSizing({outerCircleRef, innerCircleRef})

  const degrees = colourToAngle(localColour, eventInfo)
  const colourRadians = (degrees * Math.PI) / 180

  setHandlePosition({
    left: outerRadius + midlineRadius * Math.sin(colourRadians),
    bottom: outerRadius + midlineRadius * Math.cos(colourRadians),
    '--angle': `${degrees}deg`
  })
}
