export default ({refs, min=0, max, threshold=150}) => {
  const handler = event => {
    const touchX = event.touches[0].clientX
    const {x, width} = event.target.getBoundingClientRect()
    const value = event.target.value

    const centre = x + (((value - min) / (max - min)) * width)
    const upperBound = centre + threshold
    const lowerBound = centre - threshold

    const valid = lowerBound < touchX && touchX < upperBound

    if(valid) event.stopPropagation()
    else event.preventDefault()
  }

  return () => refs.forEach(ref => ref.current.addEventListener('touchmove', handler))
}
