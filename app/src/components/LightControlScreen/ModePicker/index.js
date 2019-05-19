import React, {useState, useEffect, useRef} from 'react'
import classnames from 'classnames'

import {modePicker, modeDropdown, modeOption, open as openStyle, icon} from './style'

export default ({mode, onChange, modes}) => {
  const [open, setOpen] = useState(false)
  const selfRef = useRef()

    useEffect(() => {
      const close = event => !selfRef.current.contains(event.target) && setOpen(false)
      if(open)  document.body.addEventListener('touchstart', close)

      return () => !open && document.body.removeEventListener('touchstart', close)
    }, [open])

  const dropdownModes = Object.keys(modes).filter(m => m !== mode)

  const onTouch = mode => () => {
    setOpen(false)
    onChange({mode})
  }
  const SelectedIcon = modes[mode].Icon
  return (
    <section ref={selfRef} className={modePicker}>
      <>
        <span onTouchEnd={() => setOpen(!open)}><SelectedIcon className={icon} /></span>
        <section className={classnames(modeDropdown, {[openStyle]: open})} style={{'--open-height': `calc(var(--optionHeight) * ${dropdownModes.length})`}}>
        {dropdownModes.map((mode, index) => {
          const Icon = modes[mode].Icon

          return (
            <p
             key={mode}
             className={modeOption}
             style={{'--delay': `${0.05 + (0.025 * (index + 1))}s`}}
             onTouchEnd={onTouch(mode)}>
               <>
                  <Icon className={icon} />

               </>
            </p>
          )
        })}
        </section>
      </>
    </section>
  )
}
