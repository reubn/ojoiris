import inital from '../initials/hiddenTools'

export default (state=inital, {type, payload, ...action}) => {
  if(type === 'HIDDEN_TOOLS') return payload !== undefined ? payload : !state

  return state
}
