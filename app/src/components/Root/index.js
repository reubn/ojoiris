import React from 'react'
import {StoreContext} from 'redux-react-hook'

import App from '../App'

export default ({store}) => (
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
)
