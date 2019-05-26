import qrcode from 'qrcode'

const alignSymbol = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]]

export default ({id, password, key, mac}, rectSize=10) => {
  const {modules: {size, data}} = qrcode.create(`WIFI:S:Ojoiris-${id};T:WPA;P:${password};;${key},${mac}`, {version: 8})

  const circleDiameter = 92
  const circleRadius = circleDiameter / 2

  const centerPoint = Math.round(circleRadius)
  const alignPoint = centerPoint - 1

  const remainder = (circleDiameter - size) / 2

  const paddingTop = Math.ceil(remainder)
  const paddingLeft = Math.ceil(remainder)
  const paddingRight = Math.floor(remainder)
  const paddingBottom = Math.floor(remainder)

  const alignGap = 18
  const alignOffset = alignGap - 6
  const alignSymbols = [
    {x: alignPoint, y: paddingTop - alignOffset}, // Top
    {x: alignPoint - alignGap, y: paddingTop - alignOffset}, // Top Left
    {x: alignPoint + alignGap, y: paddingTop - alignOffset}, // Top Right

    {x: paddingLeft - alignOffset, y: alignPoint}, // Left
    {x: paddingLeft - alignOffset, y: alignPoint - alignGap}, // Left Top
    {x: paddingLeft - alignOffset, y: alignPoint + alignGap}, // Left Bottom

    {x: paddingLeft - 2 + size - 1 + alignOffset, y: alignPoint}, // Right
    {x: paddingLeft - 2 + size - 1 + alignOffset, y: alignPoint - alignGap}, // Right Top
    {x: paddingLeft - 2 + size - 1 + alignOffset, y: alignPoint + alignGap}, // Right Bottom

    {x: alignPoint, y: paddingTop - 2 + size - 1 + alignOffset}, // Bottom
    {x: alignPoint + alignGap, y: paddingTop - 2 + size - 1 + alignOffset}, // Bottom Left,
    {x: alignPoint - alignGap, y: paddingTop - 2 + size - 1 + alignOffset} // Bottom Right,
  ]

  const density = data.filter(v => v).length / data.length // Match Density of QR Code

  const renderPixel = ({x, y}) => {
    if (
      x > paddingLeft - 1 &&
      x < circleDiameter - paddingRight &&
      y > paddingTop - 1 &&
      y < circleDiameter - paddingBottom
    ) return !!data[(y - paddingTop) * size + (x - paddingLeft)] //[y - paddingTop][x - paddingLeft]


    const alignAttempt = alignSymbols.find(({x: aX, y: aY}) => (x <= aX + 3 && x > aX - 2) && (y <= aY + 3 && y > aY - 2))
    if(alignAttempt) return alignSymbol[Math.abs(y - alignAttempt.y - 3)][Math.abs(x - alignAttempt.x - 3)]

    if(
      (x === paddingLeft - 1 && y > paddingTop - 1 && y < (paddingTop + 7)) ||
      (x === paddingLeft - 1 && y > (paddingTop + size - 7 - 1) && y < (paddingTop + size)) ||
      (x === paddingLeft + size && y > paddingTop - 1 && y < (paddingTop + 7)) ||
      (y === paddingTop - 1 && x > paddingLeft - 1 && x < (paddingLeft + 7)) ||
      (y === paddingTop - 1 && x > paddingLeft - 1 + size - 7 && x < paddingLeft + size) ||
      (y === paddingTop + size && x > paddingLeft - 1 && x < (paddingLeft + 7))
      ) return false

    const euclideanDistance = Math.sqrt((centerPoint - x) ** 2 + (centerPoint - y) ** 2)

    if(euclideanDistance < circleRadius - 1) return Math.random() < density
    if(euclideanDistance < circleRadius) return (x * 2) % 2

    return false
  }

  const d = Array(circleDiameter).fill()
    .flatMap((_, y) => Array(circleDiameter).fill()
      .map((_, x) => renderPixel({x, y}) ? `M${x * rectSize},${y * rectSize}v${rectSize}h${rectSize}v${-rectSize}h${-rectSize}` : '')
    ).join('')

  const viewBox = `0 0 ${circleDiameter * rectSize} ${circleDiameter * rectSize}`
  return {d, viewBox}
}
