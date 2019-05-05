import React, {useEffect, useCallback, useState, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import rgb2hsl from 'pure-color/convert/rgb2hsl'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

import lightState from '../../store/actions/lightState'

import ColourPicker from './ColourPicker'
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
    console.log({hue, brightness, enabled})
    const newState = {
      ...localState
    }

    if(hue !== null) newState.hue = Math.round((255 * hue / 360))
    if(brightness !== null) {
      newState.value = Math.round((255 * brightness / 100))

      if(newState.value > 0) newState.enabled = true
      else if(newState.value === 0) newState.enabled = false

    }
    if(enabled !== null) {
      newState.enabled = enabled
      if(!enabled) newState.value = 0
    }

    console.log(newState)

    setLocalState(newState)
    setIgnoreAsIsDuplicate(false)
  }

  const hue = 360 * localState.hue / 255
  const value = 100 * localState.value / 255

  return (
    <section className={screen}>
      <ColourPicker hue={hue} brightness={localState.value / 255} enabled={localState.enabled} onChange={handleChange}/>
      <BrightnessSlider hue={hue} brightness={value} enabled={localState.enabled} onChange={handleChange}/>
    </section>
  )
}
