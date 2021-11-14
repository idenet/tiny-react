import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElelment(virtualDOM) {
  let newElment = null
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElment = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElment = document.createElement(virtualDOM.type)
    updateNodeElement(newElment, virtualDOM)
  }
  // 将 vdom 挂载到 element中
  newElment._virtualDOM = virtualDOM

  // 递归创建子节点
  virtualDOM.children.forEach((child) => {
    mountElement(child, newElment)
  })
  // 处理元素的ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElment)
  }

  return newElment
}
