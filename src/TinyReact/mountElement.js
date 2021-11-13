import mountNativeElment from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container, oldDOM) {
  if (isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    // Component vs MativeElment
    mountNativeElment(virtualDOM, container, oldDOM)
  }
}
