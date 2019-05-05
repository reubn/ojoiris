export default ({brightness, setHandlePosition}) => () => {
  const min = 1.75 * 1.5
  const max = 100 - 1.75 * 1.5
  const distance = max - min
  setHandlePosition({
    left: `${min + (distance * brightness / 100)}%`
  })
}
