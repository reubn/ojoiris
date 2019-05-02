import calculateSizing from './calculateSizing'

export default ({outerCircleRef, innerCircleRef, portalRef, setHue}) => event => {
  if(event.target !== outerCircleRef.current && event.target !== portalRef.current) return

  const {centerX, centerY, outerRadius, midlineRadius} = calculateSizing({outerCircleRef, innerCircleRef})

  const {clientX: eventAbsoluteX, clientY: eventAbsoluteY} = event.touches[0]

  const [eventX, eventY] = [eventAbsoluteX - centerX, eventAbsoluteY - centerY] // Translate event position from page-based, to container-based

  const colourRadians = Math.atan2(eventY, eventX) + (0.5 * Math.PI) // Get angle between y-axis and touch event; rotate 1 quarter to reframe against x-axis
  const colourDegrees = (360 + Math.round(colourRadians / Math.PI * 180)) % 360

  setHue(colourDegrees)
}
