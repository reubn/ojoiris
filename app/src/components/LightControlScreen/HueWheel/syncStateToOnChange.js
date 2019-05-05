export default ({realEvent, onChange, hue, enabled}) => () => {
  if(realEvent && onChange) onChange({hue: hue / 360 * 255, enabled})
}
