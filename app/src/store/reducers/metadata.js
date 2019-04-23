import inital from '../initials/metadata'

export default (state=inital, {type, payload, ...action}) => {
  if(type === 'QR_SCAN') return payload

  return state
}
