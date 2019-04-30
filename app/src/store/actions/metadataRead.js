export default (dispatch, payload) => {
  window.location.hash = btoa(JSON.stringify(payload))
  window.location = window.location.href.replace(window.location.protocol, 'http:')

  dispatch({
      type: 'METADATA_READ',
      payload
  })
}
