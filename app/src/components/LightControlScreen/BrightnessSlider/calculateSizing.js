const duplicate = node => {
  if(node.copy) return node.copy

  const copy = node.cloneNode()
  copy.style.transition = 'none'
  copy.style.visibility = 'hidden'

  node.parentNode.appendChild(copy)
  node.copy = copy

  return copy
}

export default ({containerRef}) => {
  const container = containerRef.current
  return container.getBoundingClientRect()
}
