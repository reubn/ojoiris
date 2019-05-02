import React, {useEffect, useCallback, useState, useRef} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'

import lightState from '../../store/actions/lightState'

import keepTheFuckStill from './keepTheFuckStill'

import ColourPicker from './ColourPicker'

import {screen, slider} from './style'

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

  // Prevent swipes from moving page about
  const [redRef, greenRef, blueRef] = [useRef(), useRef(), useRef()]
  useEffect(keepTheFuckStill({refs: [redRef, greenRef, blueRef], min: 0, max: 255, threshold: 150}), [])

  const handleChange = (key, {target: {value}}) => {
    setLocalState({...localState, [key]: value})
    setIgnoreAsIsDuplicate(false)
  }

  return (
    <section className={screen}>
    <ColourPicker />
    <input type="range" min="0" max="255" value={localState.red} onChange={handleChange.bind(null, 'red')} className={slider} ref={redRef} />
    <input type="range" min="0" max="255" value={localState.green} onChange={handleChange.bind(null, 'green')} className={slider} ref={greenRef} />
    <input type="range" min="0" max="255" value={localState.blue} onChange={handleChange.bind(null, 'blue')} className={slider} ref={blueRef} />
    </section>
  )
}
