import {write} from  '../../localStorage'

export default ({getState}) => next => action => {
  next(action)

  if(action.type.startsWith('LIGHT_')){
      const {light: {state}, metadata: {id}} = getState()
      write({id, state})
  }
}
