export default ({setRealEvent, setHue, hueProp, setEnabled, enabledProp, active}) => () => {
  if(active) return
  setRealEvent(false)

  setHue(hueProp / 255 * 360)
  setEnabled(enabledProp)
}
