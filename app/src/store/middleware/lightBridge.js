import makeRequest from '../../lightAPI/makeRequest'
import isOnline from '../../lightAPI/isOnline'
import parseResponse from '../../lightAPI/parseResponse'

import {searching, notSearching} from '../reducers/light'

export default ({getState, dispatch}) => next => async action => {
  const {light: {state: previousState}} = getState()
  next(action)

  if(action.type === 'LIGHT_STATE'){
    const rollback = () => dispatch({type: 'LIGHT_STATE_ROLLBACK', payload: previousState})

    const {light: {state}, metadata} = getState()

    const response = await makeRequest(state, metadata).catch(() => ({ok: false}))

    if(!response.ok) return rollback()

    const text = await response.text().catch(rollback)

    dispatch({
      type: 'LIGHT_STATE_CONFIRMED',
      payload: parseResponse(text)
    })
  }

  if(action.type === 'LIGHT_ONLINE_CHECK'){
    const {metadata} = getState()

    if(!metadata.id) return

    const response = await isOnline(metadata)
    if(!response) return dispatch({type: 'LIGHT_SEARCHING_NOT_FOUND'})

    const text = await response.text()

    dispatch({
      type: 'LIGHT_STATE_CONFIRMED',
      payload: parseResponse(text)
    })
    dispatch({type: 'LIGHT_SEARCHING_FOUND'})
  }
}
