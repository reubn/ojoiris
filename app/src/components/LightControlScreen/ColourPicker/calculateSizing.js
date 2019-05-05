const duplicate = node => {
  if(node.copy) return node.copy

  const copy = node.cloneNode()
  copy.style.transition = 'none'
  copy.style.visibility = 'hidden'

  node.parentNode.appendChild(copy)
  node.copy = copy

  return copy
}

export default ({outerCircleRef, innerCircleRef}) => {
  const outerCircle = duplicate(outerCircleRef.current)
  const innerCircle = duplicate(innerCircleRef.current)

  const {width: widthOuter, height: heightOuter, x: baseX, y: baseY} = outerCircle.getBoundingClientRect()
  const {width: widthInner, height: heightInner} = innerCircle.getBoundingClientRect()

  const [centerX, centerY] = [
    baseX + (widthOuter / 2),
    baseY + (heightOuter / 2)
  ]

  const [outerRadius, innerRadius] = [widthOuter / 2, widthInner / 2]
  const midlineRadius = innerRadius + ((outerRadius - innerRadius) / 2)

  return {centerX, centerY, outerRadius, midlineRadius}
}
