export default text => text.trim().split('\n').reduce((object, line) => {
    const [key, value] = line.trim().split(' ')

    let normalisedValue = value

    if(key === 'enabled') normalisedValue = value === '1'
    else try {normalisedValue = parseInt(value)} catch(_){}

    return {
      ...object,
      [key]: normalisedValue
    }
  }, {})


// show 2
// brightness 255
// topHold 2750
// bottomHold 1750
// transitionLength 3250
// dimmingLength 1000
// colourOffsetIncrement 0.00
// fps 16.00
// enabled 1
