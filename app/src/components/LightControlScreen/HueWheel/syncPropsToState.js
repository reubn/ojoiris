export default ({setRealEvent, setLocalColour, colour, setEnabled, enabledProp, active, eventInfo, setEventInfo}) => () => {
  if(active) return
  setRealEvent(false)

  setEventInfo({
    angle: null,
    side: eventInfo.side
  })
  setLocalColour(colour)
  setEnabled(enabledProp)
}
