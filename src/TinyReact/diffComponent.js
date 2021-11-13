import mountElement from './mountElement'

export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container
) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 同一个组建 做组件更新操作
  } else {
    // 不是同一个组建
    mountElement(virtualDOM, container, oldDOM)
  }
}

// 判断是否是同一个组建
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
