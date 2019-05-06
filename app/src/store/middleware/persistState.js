import {localStorageKeyName} from '../initials/light'

export default ({getState}) => next => action => {
  next(action)

  if(action.type.startsWith('LIGHT_STATE')){
      const {light: {state}} = getState()
      localStorage.setItem(localStorageKeyName, JSON.stringify(state))
  }
}
