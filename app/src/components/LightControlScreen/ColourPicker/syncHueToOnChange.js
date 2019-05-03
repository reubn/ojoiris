export default ({realEvent, onChange, hue}) => () => {
  if(realEvent && onChange) onChange(hue)
}
