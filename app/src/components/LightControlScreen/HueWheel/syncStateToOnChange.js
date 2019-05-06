export default ({realEvent, onChange, localColour, enabled}) => () => {
  if(realEvent && onChange) onChange({colour: localColour, enabled})
}
