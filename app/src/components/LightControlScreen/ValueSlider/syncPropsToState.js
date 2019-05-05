export default ({setRealEvent, setValue, valueProp, active}) => () => {
  if(active) return
  setRealEvent(false)

  setValue(valueProp / 255)
}
