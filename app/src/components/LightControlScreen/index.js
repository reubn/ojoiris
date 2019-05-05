import React, {useEffect, useCallback, useState, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import rgb2hsl from 'pure-color/convert/rgb2hsl'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

import lightState from '../../store/actions/lightState'

import HueWheel from './HueWheel'
import ValueIcon from './ValueIcon'

import ValueSlider from './ValueSlider'

import {screen} from './style'

export default () => {
  const dispatch = useDispatch()
  const mapState = useCallback(state => ({
    state: state.light.state
  }))
  const {state} = useMappedState(mapState)

  const [localState, setLocalState] = useState(state)
  const [lastOnValue, setLastOnValue] = useState(255)
  const [ignoreAsIsDuplicate, setIgnoreAsIsDuplicate] = useState(false)

  // Update on state changes
  useEffect(() => {
    if(state.value) setLastOnValue(state.value)

    setLocalState(state)
    setIgnoreAsIsDuplicate(true) // Prevent Loop
  }, [state])

  // Dispatch local state changes
  useEffect(() => {
    if(!ignoreAsIsDuplicate) lightState(dispatch, localState)
  }, [localState])

  const handleChange = ({hue=null, value=null, enabled=null}) => {
    const newState = {
      ...localState
    }

    if(hue !== null) newState.hue = hue

    if(value !== null) {
      setLastOnValue(value)
      newState.value = value

      if(newState.value > 0) newState.enabled = true
      else if(newState.value === 0) newState.enabled = false

    }

    if(enabled !== null) {
      newState.enabled = enabled
      if(!enabled) newState.value = 0
      else newState.value = lastOnValue
    }

    setLocalState(newState)
    setIgnoreAsIsDuplicate(false)
  }

  return (
    <section className={screen}>
      <HueWheel hue={localState.hue} value={localState.value} enabled={localState.enabled} onChange={handleChange}>
        <ValueIcon value={localState.value} />
      </HueWheel>
      <ValueSlider hue={localState.hue} value={localState.value} enabled={localState.enabled} onChange={handleChange}/>
    </section>
  )
}
