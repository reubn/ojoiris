import metadataRead from './metadataRead'

const sleep = m => new Promise(r => setTimeout(r, m))

const pattern = /^WIFI:S:Ojoiris-(?<id>[A-Z]{2}[0-9]{2}).*?P:(?<password>.+?);;(?<key>.+?),(?<mac>.+?)$/

export default async (dispatch, result) => {
  if(!result) return dispatch({type: 'QR_SCAN_SCANNING'})

  const {data, location} = result
  const match = pattern.exec(data)
  if(!match) return dispatch({type: 'QR_SCAN_FAIL'})

  dispatch({type: 'QR_SCAN_SUCCESS'})

  await sleep(800)
  metadataRead(dispatch, match.groups)
}
