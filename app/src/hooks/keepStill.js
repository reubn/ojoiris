export default elementRef => () => {
  elementRef.current.addEventListener('touchmove', event => event.preventDefault(), {passive: false})
}
