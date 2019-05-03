import React, {useEffect, useCallback, useState, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import rgb2hsl from 'pure-color/convert/rgb2hsl'
import hsl2rgb from 'pure-color/convert/hsl2rgb'

import lightState from '../../store/actions/lightState'

import ColourPicker from './ColourPicker'

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

  const handleChange = hue => {
    const [red, green, blue] = hsl2rgb([hue, 100, 50]).map(n => Math.round(n))
    setLocalState({...localState, red, green, blue})
    setIgnoreAsIsDuplicate(false)
  }

  const hue = rgb2hsl([localState.red, localState.green, localState.blue])[0]

  return (
    <section className={screen}>
    <ColourPicker hue={hue} onChange={handleChange}/>
    </section>
  )
}
