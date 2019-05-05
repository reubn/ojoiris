export default ({realEvent, onChange, value}) => () => {
  if(realEvent && onChange) onChange({value: value * 255})
}
