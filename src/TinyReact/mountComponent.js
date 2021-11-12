import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElment from './mountNativeElement'
export default function mountComponent(virtualDOM, container) {
  let nextVirtualDOM = null
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  }
  // 还是组件
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  }
  mountNativeElment(nextVirtualDOM, container)
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}