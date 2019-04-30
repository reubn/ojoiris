import makeRequest from '../../lightAPI/makeRequest'
import parseResponse from '../../lightAPI/parseResponse'

export default ({getState, dispatch}) => next => async action => {
  const result = next(action)
  if(action.type === 'LIGHT_STATE' && !action.noTrigger){
    const {light: {state}, metadata} = getState()

    if(!metadata.id) return
    dispatch({
      type: 'LIGHT_SEARCHING',
      payload: true
    })
    const response = await makeRequest(state, metadata)
    const text = await response.text()

    dispatch({
      type: 'LIGHT_STATE',
      payload: parseResponse(text),
      noTrigger: true
    })
  }

  return result
}
