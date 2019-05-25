import React, {useState, useRef, useEffect} from 'react'
import qrGenerate from './qrGenerate'
import getRandomMetadata from './getRandomMetadata'

import {title, explination, description, prompt, svgContainer, input} from './style'

export default () => {
  const [metadata, setMetadata] = useState(getRandomMetadata({}))
  const {d, viewBox} = qrGenerate(metadata)

  const inputRefs = Array(4).fill().map(() => useRef())

  useEffect(() => {
    const handler = event => event.stopPropagation()

    inputRefs.forEach(({current: element}) => element.addEventListener('touchstart', handler))
    return () => inputRefs.forEach(({current: element}) => element.removeEventListener('touchstart', handler))
  }, [])

  const changeHandler = event => {
    const key = event.target.placeholder.toLowerCase()
    const value = event.target.value
    setMetadata({...metadata, [key]: value})
  }

  return (
  <>
    <section className={explination}>
      <h1 className={title}>👀</h1>
      <p className={description}>Hidden Tools</p>
    </section>
    <section className={prompt}>
        <input type="text" ref={inputRefs[0]} className={input} onChange={changeHandler} value={metadata.id} placeholder="ID" />
        <input type="text" ref={inputRefs[1]} className={input} onChange={changeHandler} value={metadata.key} placeholder="Key" />
        <input type="text" ref={inputRefs[2]} className={input} onChange={changeHandler} value={metadata.password} placeholder="Password" />
        <input type="text" ref={inputRefs[3]} className={input} onChange={changeHandler} value={metadata.mac} placeholder="MAC" />
        <section className={svgContainer}>
          <svg viewBox={viewBox} onTouchStart={() => setMetadata(getRandomMetadata(metadata))}>
          <path d={d} />
          </svg>
      </section>
    </section>
  </>
)
}
