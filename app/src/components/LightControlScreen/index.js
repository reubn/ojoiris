import React, {useEffect, useCallback, useState, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import rgb2hsl from 'pure-color/convert/rgb2hsl'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

import lightState from '../../store/actions/lightState'
import pageVisibilityUpdateState from '../../hooks/pageVisibilityUpdateState'

import HueWheel from './HueWheel'
import ValueIcon from './ValueIcon'
import ModePicker from './ModePicker'
import Slider from './Slider'

import colourModes from './colourModes'

import {screen, sliderGroup} from './style'

export default () => {
  const dispatch = useDispatch()
  const mapState = useCallback(state => ({
    state: state.light.state
  }))
  const {state} = useMappedState(mapState)

  const [localState, setLocalState] = useState(state)
  const [lastOnValue, setLastOnValue] = useState(255)
  const [mode, setMode] = useState('colour')
  const [ignoreAsIsDuplicate, setIgnoreAsIsDuplicate] = useState(true)

  // Update on state changes
  useEffect(() => {
    if(state.value) setLastOnValue(state.value)
    if(state.show !== colourModes[mode].show) setMode(Object.entries(colourModes).find(([key, {show}]) => state.show === show)[0])

    setLocalState(state)
    setIgnoreAsIsDuplicate(true) // Prevent Loop
  }, [state])

  // Dispatch local state changes
  useEffect(() => {
    if(!ignoreAsIsDuplicate) lightState(dispatch, localState)
  }, [localState])

  useEffect(pageVisibilityUpdateState(dispatch), [])

  const handleChange = ({colour: {hue=null, saturation=null, value=null}={}, enabled=null, mode=null}) => {
    const newState = {...localState}

    if(hue !== null) newState.hue = hue
    if(saturation !== null) newState.saturation = saturation
    if(mode !== null && colourModes[mode]){
      setMode(mode)
      newState.show = colourModes[mode].show
    }

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

  const colour = {
    hue: localState.hue,
    saturation: localState.saturation,
    value: localState.value
  }

  const currentMode = colourModes[mode]

  return (
    <section className={screen}>
      <ModePicker mode={mode} modes={colourModes} onChange={handleChange}/>
      <HueWheel colour={colour} enabled={localState.enabled} disabledInteraction={!currentMode.showControls} onChange={handleChange} config={currentMode}>
        <ValueIcon colour={colour} />
      </HueWheel>
      <span className={sliderGroup}>
        <Slider property="value" colour={colour} enabled={localState.enabled} disabledInteraction={!currentMode.showControls} onChange={handleChange} style={{background: 'linear-gradient(to right, black, var(--colour))'}}/>
        <Slider property="saturation" colour={colour} enabled={localState.enabled} disabledInteraction={!currentMode.showControls} onChange={handleChange} style={{background: 'linear-gradient(to right, white, var(--colour))'}}/>
      </span>
    </section>
  )
}
