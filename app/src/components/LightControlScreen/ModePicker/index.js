import React, {useState, useEffect, useRef} from 'react'
import classnames from 'classnames'

import {modePicker, modeDropdown, modeOption, open as openStyle, icon} from './style'

export default ({mode, setMode, modes}) => {
  const [open, setOpen] = useState(false)
    useEffect(() => {
      const close = () => setOpen(false)
      if(open)  document.body.addEventListener('touchstart', close)
      
      return () => !open && document.body.removeEventListener('touchstart', close)
    }, [open])

  const onTouch = mode => () => {
    setOpen(false)
    setMode(mode)
  }
  const SelectedIcon = modes[mode].Icon
  return (
    <section className={modePicker}>
      <>
        <span onTouchEnd={() => setOpen(!open)}><SelectedIcon className={icon} /></span>
        <section className={classnames(modeDropdown, {[openStyle]: open})} style={{'--open-height': `calc(var(--optionHeight) * ${Object.keys(modes).length})`}}>
        {Object.keys(modes).map((mode, index) => {
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
