import makeRequest from '../../lightAPI/makeRequest'
import isOnline from '../../lightAPI/isOnline'
import parseResponse from '../../lightAPI/parseResponse'

import {searching, notSearching} from '../reducers/light'

export default ({getState, dispatch}) => next => async action => {
  const {light: {state: previousState}} = getState()
  next(action)

  if(action.type === 'LIGHT_STATE' && !action.noTrigger){
    const {light: {state}, metadata} = getState()

    if(!metadata.id) return
    const response = await makeRequest(state, metadata).catch(() => dispatch({type: 'LIGHT_STATE', payload: previousState, noTrigger: true}))
    const text = await response.text().catch(() => dispatch({type: 'LIGHT_STATE', payload: previousState, noTrigger: true}))

    dispatch({
      type: 'LIGHT_STATE',
      payload: parseResponse(text),
      noTrigger: true
    })
  }

  if(action.type === 'LIGHT_ONLINE_CHECK'){
    const {metadata} = getState()

    if(!metadata.id) return

    const response = await isOnline(metadata)
    if(!response) return dispatch({type: 'LIGHT_SEARCHING_NOT_FOUND'})

    const text = await response.text()

    dispatch({
      type: 'LIGHT_STATE',
      payload: parseResponse(text),
      noTrigger: true
    })
    dispatch({type: 'LIGHT_SEARCHING_FOUND'})
  }
}
