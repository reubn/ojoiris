import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

export default () => {
  const mapState = useCallback(state => ({
    homescreen: state.homescreen
  }), [])

  const {homescreen} = useMappedState(mapState);

  return <p>{homescreen ? 1 : 0}</p>
}
