import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import QRScanner from '../QRScanner'
import HomeScreenPrompt from '../HomeScreenPrompt'
import WifiSetup from '../WifiSetup'
import LightControlScreen from '../LightControlScreen'

import {app} from './style'

export default () => {
    const mapState = useCallback(state => ({
      haveMetadata: !!state.metadata.id,
      light: state.light.state.hasOwnProperty('enabled'),
      appMode: state.homescreen.appMode
    }))

    const {haveMetadata, light, appMode} = useMappedState(mapState)

    let pane
    if(haveMetadata && light && appMode) pane = <LightControlScreen />
    else if(haveMetadata && light) pane = <HomeScreenPrompt />
    else if(haveMetadata) pane = <WifiSetup />
    else pane = <QRScanner />

  return <section className={app}>
    {pane}
  </section>
}
