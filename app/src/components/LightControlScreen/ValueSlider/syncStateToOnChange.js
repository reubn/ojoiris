export default ({realEvent, onChange, value}) => () => {
  if(realEvent && onChange) onChange({colour: {value: value * 255}})
}
