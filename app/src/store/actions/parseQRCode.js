import metadataRead from './metadataRead'

const sleep = m => new Promise(r => setTimeout(r, m))

const pattern = /^WIFI:S:Ojoiris-(?<id>[A-Z]{2}[0-9]{2}).*?P:(?<password>.+?);;(?<key>.+?),(?<mac>.+?)$/

let failTimer
let failLocked = false

export default async (dispatch, result) => {
  if(failLocked) return dispatch({type: 'QR_SCAN_FAIL'})

  if(!result) return dispatch({type: 'QR_SCAN_SCANNING'})

  const {data, location} = result
  const match = pattern.exec(data)
  if(!match) {
    failLocked = true

    clearTimeout(failTimer)
    failTimer = setTimeout(() => {failLocked = false}, 1500)

    return dispatch({type: 'QR_SCAN_FAIL'})
  }

  dispatch({type: 'QR_SCAN_SUCCESS'})

  await sleep(800)
  metadataRead(dispatch, match.groups)
}
