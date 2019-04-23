import jsQR from 'jsQR'

const inversionAttempts = 'dontInvert'
const grayscaleWeights = {
    // weights for quick luma integer approximation (https://en.wikipedia.org/wiki/YUV#Full_swing_for_BT.601)
    red: 77,
    green: 150,
    blue: 29,
    useIntegerApproximation: true
}

self.onmessage = ({data: {type, data: {data: rgbaData, width, height}}}) => {
  if(type === 'decode') self.postMessage({
      type: 'scan',
      result: jsQR(rgbaData, width, height, {inversionAttempts, grayscaleWeights}),
  })
  else if(type === 'close') self.close()
}
