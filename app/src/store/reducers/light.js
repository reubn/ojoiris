import inital, {searching} from '../initials/light'

export default (state=inital, {type, payload={}, ...action}) => {
  if(type === 'LIGHT_STATE') return {
    ...state,
    state: {
      ...state.state,
      ...payload
    }
  }

  if(type === 'LIGHT_SEARCHING') return {
    ...state,
    status: searching
  }

  return state
}

export {searching}
