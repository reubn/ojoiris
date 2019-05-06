export default dispatch => () => {
  const handler = () => !document.hidden && dispatch({type: 'LIGHT_ONLINE_CHECK'})

  document.addEventListener('visibilitychange', handler)
  return () => document.removeEventListener('visibilitychange', handler)
}
