import debounce from 'debounce-fn'

const debounced = debounce((dispatch, localState) => {
  dispatch({type: 'LIGHT_STATE', payload: localState})
  debounced.cancel()
}, {wait: 40, leading: true})

export default debounced
