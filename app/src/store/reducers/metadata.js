import inital from '../initials/metadata'

export default (state=inital, {type, payload, ...action}) => {
  if(type === 'METADATA_READ') return payload

  return state
}
