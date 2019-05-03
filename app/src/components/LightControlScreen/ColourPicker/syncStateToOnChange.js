export default ({realEvent, onChange, hue, enabled}) => () => {
  if(realEvent && onChange) onChange({hue, enabled})
}
