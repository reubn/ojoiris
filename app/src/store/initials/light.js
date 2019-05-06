export const searching = Symbol('searching')

export const localStorageKeyName = 'lastKnownLightState'

const persistedStateString = localStorage.getItem(localStorageKeyName)

export default {
  state:  persistedStateString ? JSON.parse(persistedStateString) : {},
  status: searching,
  searchCount: 0
}
