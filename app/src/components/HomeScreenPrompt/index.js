import React from 'react'

import ShareIcon from './ShareIcon'
import AddToHomeScreenIcon from './AddToHomeScreenIcon'

import {title, explination, description, prompt, step, icon, instruction, bold, shareIcon, addToHomeScreenIcon} from './style'

export default () => (
  <>
  <section className={explination}>
  <h1 className={title}>One Last Thing</h1>
  <p className={description}>Ojoiris works best from your Home Screen. Tap to add it</p>
</section>
  <section className={prompt}>

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
  </>
)
