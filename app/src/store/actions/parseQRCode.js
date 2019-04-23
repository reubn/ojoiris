const pattern = /^WIFI:S:Ojoiris-(?<id>[A-Z]{2}[0-9]{2}).*?P:(?<password>.+?);;(?<key>.+?),(?<mac>.+?)$/

export default (dispatch, {data, location}) => {
  const match = pattern.exec(data)

  if(match) dispatch({
      type: 'QR_SCAN',
      payload: match.groups
  })
}
