import {combineReducers} from 'redux'

import homescreen from './homescreen'
import qr from './qr'
import metadata from './metadata'

const reducers = {
  homescreen,
  qr,
  metadata
}

export default combineReducers(reducers)
