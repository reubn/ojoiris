import calculateSizing from './calculateSizing'

export default ({outerCircleRef, innerCircleRef, hue, setPortalPosition, onChange}) => () => {
  if(onChange) onChange(hue)
  
  const {outerRadius, midlineRadius} = calculateSizing({outerCircleRef, innerCircleRef})
  const colourRadians = (hue * Math.PI) / 180

  setPortalPosition({left: outerRadius + midlineRadius * Math.sin(colourRadians), bottom: outerRadius + midlineRadius * Math.cos(colourRadians)})
}
