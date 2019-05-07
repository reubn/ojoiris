export const localStorageKeyName = 'lastKnownLightState'

const persistedStateString = localStorage.getItem(localStorageKeyName) || '{}'
const all = JSON.parse(persistedStateString)

export const read = ({id}) => (all[id] || {})
export const write = ({id, state}) => localStorage.setItem(localStorageKeyName, JSON.stringify({...all, [id]: state}))
