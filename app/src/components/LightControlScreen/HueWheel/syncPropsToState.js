export default ({setRealEvent, setLocalColour, colour, setEnabled, enabledProp, active}) => () => {
  if(active) return
  setRealEvent(false)

  setLocalColour(colour)
  setEnabled(enabledProp)
}
