import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import QRScanner from '../QRScanner'

import {app} from './style'

export default () => {
  const mapState = useCallback(state => ({
    homescreen: state.homescreen
  }), [])

  const {homescreen} = useMappedState(mapState);

  return <section className={app}>
    <QRScanner />
  </section>
}
