export default ({setRealEvent, setHue, hueProp, setEnabled, enabledProp}) => () => {
  setRealEvent(false)
  
  setHue(hueProp)
  setEnabled(enabledProp)
}
