import {applyMiddleware, compose} from 'redux'

import lightBridge from './lightBridge'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default composeEnhancers(applyMiddleware(lightBridge))
