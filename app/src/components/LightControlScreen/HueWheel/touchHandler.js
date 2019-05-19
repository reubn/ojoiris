import calculateSizing from './calculateSizing'

export default ({outerCircleRef, innerCircleRef, handleRef, localColour, setLocalColour, angleToColour, setRealEvent, touchOn, enabled, setEventInfo, disabledInteraction}) => event => {
  if(disabledInteraction || !enabled || (event.target !== outerCircleRef.current && event.target !== handleRef.current)) return
  touchOn()

  const {centerX, centerY, outerRadius, midlineRadius} = calculateSizing({outerCircleRef, innerCircleRef})

  const {clientX: eventAbsoluteX, clientY: eventAbsoluteY} = event.touches[0]

  const [eventX, eventY] = [eventAbsoluteX - centerX, eventAbsoluteY - centerY] // Translate event position from page-based, to container-based

  const baseRadians = Math.atan2(eventY, eventX)
  const colourRadians = baseRadians + (0.5 * Math.PI) // Get angle between y-axis and touch event; rotate 1 quarter to reframe against x-axis
  const colourDegrees = (360 + colourRadians / Math.PI * 180) % 360

  setRealEvent(true)
  setEventInfo({
    angle: colourDegrees,
    side: eventAbsoluteX > centerX ? 1 : 2
  })
  setLocalColour({...localColour, ...angleToColour(colourDegrees)})
}
