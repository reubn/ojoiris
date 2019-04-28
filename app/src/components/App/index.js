import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import QRScanner from '../QRScanner'
import HomeScreenPrompt from '../HomeScreenPrompt'

import {app} from './style'

export default () => {
    const mapState = useCallback(state => ({
      haveMetadata: !!state.metadata.id
    }), [])

    const {haveMetadata} = useMappedState(mapState);

    const pane = haveMetadata ? <HomeScreenPrompt /> : <QRScanner />

  return <section className={app}>
    {pane}
  </section>
}
