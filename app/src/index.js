import React from 'react'
import {render} from 'react-dom'

import store from './store'
import Root from './components/Root'

store.dispatch({type: 'LIGHT_ONLINE_CHECK'})

render(<Root store={store} />, document.body)

document.body.addEventListener('touchstart', event => {
  if(navigator.standalone) event.preventDefault() // Absorb events that are not handled in app, ie unwanted touches
  if(event.targetTouches.length === 3) store.dispatch({type: 'HIDDEN_TOOLS'})
}, {passive: false})
