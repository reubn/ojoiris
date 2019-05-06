import calculateSizing from './calculateSizing'

export default ({containerRef, handleRef, setValue, setRealEvent, touchOn, enabled}) => event => {
  if(event.target !== containerRef.current && event.target !== handleRef.current) return
  touchOn()

  const {width, x} = calculateSizing({containerRef})

  const {clientX: eventAbsoluteX} = event.touches[0]

  setRealEvent(true)
  setValue(Math.max(0, Math.min((eventAbsoluteX - x) / width, 1)))
}
