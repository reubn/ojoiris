import React, {useEffect, useCallback, useState, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import rgb2hsl from 'pure-color/convert/rgb2hsl'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

import lightState from '../../store/actions/lightState'

import ColourPicker from './ColourPicker'
import BrightnessIcon from './BrightnessIcon'

import BrightnessSlider from './BrightnessSlider'

import {screen} from './style'

export default () => {
  const dispatch = useDispatch()
  const mapState = useCallback(state => ({
    state: state.light.state
  }))
  const {state} = useMappedState(mapState)

  const [localState, setLocalState] = useState(state)
  const [ignoreAsIsDuplicate, setIgnoreAsIsDuplicate] = useState(false)

  // Update on state changes
  useEffect(() => {
    setLocalState(state)
    setIgnoreAsIsDuplicate(true) // Prevent Loop
  }, [state])

  // Dispatch local state changes
  useEffect(() => {
    if(!ignoreAsIsDuplicate) lightState(dispatch, localState)
  }, [localState])

  const handleChange = ({hue=null, brightness=null, enabled=null}) => {
    const newState = {
      ...localState
    }

    if(hue !== null) newState.hue = hue

    if(brightness !== null) {
      newState.value = brightness

      if(newState.value > 0) newState.enabled = true
      else if(newState.value === 0) newState.enabled = false

    }

    if(enabled !== null) {
      newState.enabled = enabled
      if(!enabled) newState.value = 0
    }

    setLocalState(newState)
    setIgnoreAsIsDuplicate(false)
  }

  return (
    <section className={screen}>
      <ColourPicker hue={localState.hue} brightness={localState.value} enabled={localState.enabled} onChange={handleChange}>
        <BrightnessIcon brightness={localState.value} />
      </ColourPicker>
      <BrightnessSlider hue={localState.hue} brightness={localState.value} enabled={localState.enabled} onChange={handleChange}/>
    </section>
  )
}
