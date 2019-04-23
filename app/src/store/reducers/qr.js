import inital from '../initials/qr'

export const scanning = inital
export const success = Symbol('success')
export const fail = Symbol('fail')

export default (state=inital, {type, payload, ...action}) => {
  if(type === 'QR_SCAN_SUCCESS') return success
  if(type === 'QR_SCAN_FAIL') return fail
  if(type === 'QR_SCAN_SCANNING') return scanning

  return state
}
