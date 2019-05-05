import calculateSizing from './calculateSizing'

export default ({containerRef, handleRef, setBrightness, setRealEvent, touchOn, enabled}) => event => {
  if(event.target !== containerRef.current && event.target !== handleRef.current) return
  touchOn()

  const {width, x} = calculateSizing({containerRef})

  const {clientX: eventAbsoluteX} = event.touches[0]

  setRealEvent(true)
  setBrightness(Math.max(0, Math.min((eventAbsoluteX - x) / width, 1)))
}
