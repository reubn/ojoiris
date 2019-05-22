import React, {Suspense, useCallback, lazy} from 'react'
import {useMappedState} from 'redux-react-hook'

const QRScanner = lazy(() => import('../QRScanner'))
const HomeScreenPrompt = lazy(() => import('../HomeScreenPrompt'))
const WifiSetup = lazy(() => import('../WifiSetup'))
const LightControlScreen = lazy(() => import('../LightControlScreen'))
const HiddenTools = lazy(() => import('../HiddenTools'))

import {app} from './style'

export default () => {
    const mapState = useCallback(state => ({
      haveMetadata: !!state.metadata.id,
      light: state.light.state.hasOwnProperty('enabled'),
      appMode: state.homescreen.appMode,
      hiddenTools: state.hiddenTools
    }))

    const {haveMetadata, light, appMode, hiddenTools} = useMappedState(mapState)

    let pane
    if(hiddenTools) pane = <HiddenTools />
    else if(haveMetadata && light && appMode) pane = <LightControlScreen />
    else if(haveMetadata && light) pane = <HomeScreenPrompt />
    else if(haveMetadata) pane = <WifiSetup />
    else pane = <QRScanner />

  return <section className={app}>
    <Suspense fallback={<></>}>{pane}</Suspense>
  </section>
}
