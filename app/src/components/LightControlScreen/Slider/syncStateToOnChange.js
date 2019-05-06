export default ({realEvent, onChange, value, property}) => () => {
  if(realEvent && onChange) onChange({colour: {[property]: value * 255}})
}
