import inital, {searching} from '../initials/light'

export const notSearching = Symbol('notSearching')

export default (state=inital, {type, payload={}, ...action}) => {
  if(type === 'LIGHT_STATE') return {
    ...state,
    state: {
      ...state.state,
      ...payload
    }
  }

  if(type === 'LIGHT_ONLINE_CHECK') return {
    ...state,
    status: searching
  }

  if(type === 'LIGHT_SEARCHING_FOUND') return {
    ...state,
    status: notSearching,
    searchCount: state.searchCount + 1
  }

  if(type === 'LIGHT_SEARCHING_NOT_FOUND') return {
    ...state,
    status: notSearching,
    searchCount: state.searchCount + 1
  }

  return state
}

export {searching}
