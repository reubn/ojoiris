export default text => text.trim().split('\n').reduce((object, line) => {
    const [key, value] = line.trim().split(' ')

    let normalisedValue = value

    if(key === 'enabled') normalisedValue = value === '1'
    else if(key === 'timestamp') normalisedValue = {offset: value - Date.now()}
    else try {normalisedValue = parseInt(value)} catch(_){}

    return {
      ...object,
      [key]: normalisedValue
    }
  }, {})
