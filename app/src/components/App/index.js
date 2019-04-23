import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import QRScanner from '../QRScanner'

import {app, test} from './style'

export default () => {
    const mapState = useCallback(state => ({
      haveMetadata: !!state.metadata.id
    }), [])

    const {haveMetadata} = useMappedState(mapState);

    const pane = haveMetadata ? <section className={test}></section> : <QRScanner />

  return <section className={app}>
    {pane}
  </section>
}
