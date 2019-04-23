import {combineReducers} from 'redux'

import homescreen from './homescreen'
import metadata from './metadata'

const reducers = {
  homescreen,
  metadata
}

export default combineReducers(reducers)
