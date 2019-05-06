export default kelvin => {
  if(kelvin === 6500) return [255, 255, 255]

  const temperature = kelvin / 100

  if(kelvin < 6500) {
    const greenX = temperature - 2
    const green = -155.25485562709179 - 0.44596950469579133 * greenX + 104.49216199393888 * Math.log(greenX)

    const blueX = temperature - 10
    const blue = kelvin > 2000 ? -254.76935184120902 + 0.8274096064007395 * blueX + 115.67994401066147 * Math.log(blueX) : 0

    return [255, green, blue]
  }

  const redX = temperature - 55
  const red = 351.97690566805693 + 0.114206453784165 * redX - 40.25366309332127 * Math.log(redX)

  const greenX = temperature - 50
  const green = 325.4494125711974 + 0.07943456536662342 * greenX - 28.0852963507957 * Math.log(greenX)

  return [red, green, 255]

}
