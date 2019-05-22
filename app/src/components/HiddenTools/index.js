import React, {useState, useRef, useEffect} from 'react'
import qrGenerate from './qrGenerate'
import getRandomMetadata from './getRandomMetadata'

import {title, explination, description, prompt, svgContainer, input} from './style'

export default () => {
  const [metadata, setMetadata] = useState(getRandomMetadata())
  const {d, viewBox} = qrGenerate(metadata)

  const inputRefs = Array(4).fill().map(() => useRef())

  useEffect(() => {
    const handler = event => event.stopPropagation()

    inputRefs.forEach(({current: element}) => element.addEventListener('touchstart', handler))
    return () => inputRefs.forEach(({current: element}) => element.removeEventListener('touchstart', handler))
  }, [])


  return (
  <>
    <section className={explination}>
      <h1 className={title}>👀</h1>
      <p className={description}>Hidden Tools</p>
    </section>
    <section className={prompt}>
      <section className={0}>
        <input type="text" ref={inputRefs[0]} className={input} onChange={e => setMetadata({...metadata, [e.target.placeholder.toLowerCase()]: e.target.value})} value={metadata.id} placeholder="ID" />
        <input type="text" ref={inputRefs[1]} className={input} onChange={e => setMetadata({...metadata, [e.target.placeholder.toLowerCase()]: e.target.value})} value={metadata.key} placeholder="Key" />
        <input type="text" ref={inputRefs[2]} className={input} onChange={e => setMetadata({...metadata, [e.target.placeholder.toLowerCase()]: e.target.value})} value={metadata.password} placeholder="Password" />
        <input type="text" ref={inputRefs[3]} className={input} onChange={e => setMetadata({...metadata, [e.target.placeholder.toLowerCase()]: e.target.value})} value={metadata.mac} placeholder="MAC" />
        <section className={svgContainer}>
          <svg viewBox={viewBox} onTouchStart={() => setMetadata(getRandomMetadata())}>
          <path d={d} />
          </svg>
        </section>
      </section>
    </section>
  </>
)
}
