export default containerRef => () => {
  containerRef.current.addEventListener('touchmove', event => event.preventDefault(), {passive: false})
}
