import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElment from './mountNativeElement'
export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }
  // 查看还是不是组件
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    mountNativeElment(nextVirtualDOM, container, oldDOM)
  }
}

/**
 * 将props传递给函数组件
 * @param {*} virtualDOM
 * @returns
 */
function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  // 实例化class组件 传递props
  const component = new virtualDOM.type(virtualDOM.props || {})
  // 拿到render函数
  const nextVirtualDOM = component.render()
  // 将实例赋值给nextvirtualdom
  nextVirtualDOM.component = component
  return nextVirtualDOM
}
