export default ({outerCircleRef, innerCircleRef}) => {
  const {x: containerX, y: containerY, width: widthOuter, height: heightOuter} = outerCircleRef.current.getBoundingClientRect()
  const {width: widthInner, height: heightInner} = innerCircleRef.current.getBoundingClientRect()

  const [centerX, centerY] = [
    containerX + (widthOuter / 2),
    containerY + (heightOuter / 2)
  ]

  const [outerRadius, innerRadius] = [widthOuter / 2, widthInner / 2]
  const midlineRadius = innerRadius + ((outerRadius - innerRadius) / 2)

  return {centerX, centerY, outerRadius, midlineRadius}
}
