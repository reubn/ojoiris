import {combineReducers} from 'redux'

import homescreen from './homescreen'
import qr from './qr'
import metadata from './metadata'
import light from './light'
import hiddenTools from './hiddenTools'

const reducers = {
  homescreen,
  qr,
  metadata,
  light,
  hiddenTools
}

export default combineReducers(reducers)
