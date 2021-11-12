import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDomElelment(virtualDOM) {
  let newElment = null
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElment = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElment = document.createElement(virtualDOM.type)
    updateNodeElement(newElment, virtualDOM)
  }
  // 递归创建子节点
  virtualDOM.children.forEach((child) => {
    mountElement(child, newElment)
  })
  return newElment
}
