export default ({setRealEvent, setBrightness, brightnessProp, active}) => () => {
  if(active) return
  setRealEvent(false)

  setBrightness(brightnessProp / 255)
}
