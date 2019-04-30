import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import QRScanner from '../QRScanner'
import HomeScreenPrompt from '../HomeScreenPrompt'
import WifiSetup from '../WifiSetup'

import {app} from './style'

export default () => {
    const mapState = useCallback(state => ({
      haveMetadata: !!state.metadata.id,
      light: !!state.light
    }), [])

    const {haveMetadata, light} = useMappedState(mapState)

    let pane
    if(haveMetadata && light) pane = <HomeScreenPrompt />
    else if(haveMetadata) pane = <WifiSetup />
    else pane = <QRScanner />

  return <section className={app}>
    {pane}
  </section>
}
