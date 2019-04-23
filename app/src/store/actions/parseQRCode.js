const sleep = m => new Promise(r => setTimeout(r, m))

const pattern = /^WIFI:S:Ojoiris-(?<id>[A-Z]{2}[0-9]{2}).*?P:(?<password>.+?);;(?<key>.+?),(?<mac>.+?)$/

export default async (dispatch, {data, location}) => {

  const match = pattern.exec(data)
  if(!match) {

    dispatch({type: 'QR_SCAN_FAIL'})
    await sleep(3500)

    dispatch({type: 'QR_SCAN_SCANNING'})
    return
}

  dispatch({type: 'QR_SCAN_SUCCESS'})

  await sleep(800)
  dispatch({
      type: 'METADATA_READ',
      payload: match.groups
  })
}
