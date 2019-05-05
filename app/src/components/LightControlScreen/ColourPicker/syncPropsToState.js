export default ({setRealEvent, setHue, hueProp, setEnabled, enabledProp, active}) => () => {
  if(active) return 
  setRealEvent(false)

  setHue(hueProp)
  setEnabled(enabledProp)
}
