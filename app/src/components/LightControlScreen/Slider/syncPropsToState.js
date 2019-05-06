export default ({setRealEvent, setValue, colour, active, property}) => () => {
  if(active) return
  setRealEvent(false)

  setValue(colour[property] / 255)
}
