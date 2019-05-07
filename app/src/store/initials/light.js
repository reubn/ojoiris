import {read} from  '../../localStorage'

import metadata from './metadata'

export const searching = Symbol('searching')

export default {
  state: read(metadata),
  status: searching,
  searchCount: 0
}
