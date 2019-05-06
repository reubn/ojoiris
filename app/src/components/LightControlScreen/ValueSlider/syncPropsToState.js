export default ({setRealEvent, setValue, colour, active}) => () => {
  if(active) return
  setRealEvent(false)

  setValue(colour.value / 255)
}
