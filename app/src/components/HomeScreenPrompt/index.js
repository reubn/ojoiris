import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import ShareIcon from './ShareIcon'
import AddToHomeScreenIcon from './AddToHomeScreenIcon'

import {title, prompt, step, icon, instruction, bold, shareIcon, addToHomeScreenIcon} from './style'

export default () => (
  <section className={prompt}>
    <h1 className={title}>To carry on setting up your light</h1>
    <section className={step}>
      <section className={icon}>
        <ShareIcon className={shareIcon} />
      </section>
      <section className={instruction}>
        <p>Tap the <span className={bold}>share button</span> at the bottom of your screen</p>
      </section>
    </section>
    <section className={step}>
      <section className={icon}>
        <AddToHomeScreenIcon className={addToHomeScreenIcon} />
      </section>
      <section className={instruction}>
        <p>Tap <span className={bold}>'Add to Home Screen'</span></p>
      </section>
    </section>
  </section>
)
