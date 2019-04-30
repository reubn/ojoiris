import {combineReducers} from 'redux'

import homescreen from './homescreen'
import qr from './qr'
import metadata from './metadata'
import light from './light'

const reducers = {
  homescreen,
  qr,
  metadata,
  light
}

export default combineReducers(reducers)
