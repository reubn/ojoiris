import React, {Suspense, useCallback, lazy} from 'react'
import {useMappedState} from 'redux-react-hook'

const QRScanner = lazy(() => import('../QRScanner'))
const HomeScreenPrompt = lazy(() => import('../HomeScreenPrompt'))
const WifiSetup = lazy(() => import('../WifiSetup'))
const LightControlScreen = lazy(() => import('../LightControlScreen'))

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
    <Suspense fallback={<></>}>{pane}</Suspense>
  </section>
}
