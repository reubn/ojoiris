export const empty = {
  id: undefined,
  key: undefined,
  password: undefined,
  mac: undefined
}

export default (hash => {
  if(!hash) return empty

  let decoded
  try {decoded = JSON.parse(atob(hash))}
  catch {return empty}

  const {id, key, mac, password} = decoded

  return {id, key, mac, password}
})(window.location.hash.slice(1))
