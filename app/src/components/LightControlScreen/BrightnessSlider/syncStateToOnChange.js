export default ({realEvent, onChange, brightness}) => () => {
  if(realEvent && onChange) onChange({brightness: brightness * 255})
}