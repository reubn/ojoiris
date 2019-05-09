import React from 'react'
import {render} from 'react-dom'

import store from './store'
import Root from './components/Root'

store.dispatch({type: 'LIGHT_ONLINE_CHECK'})

render(<Root store={store} />, document.body)

if(navigator.standalone) document.body.addEventListener('touchmove', e => e.preventDefault(), {passive: false})
