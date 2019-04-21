import {applyMiddleware, compose} from 'redux'

export default compose(
  applyMiddleware(),
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)
