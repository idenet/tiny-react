import mountNativeElment from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container) {
  if (isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container)
  } else {
    // Component vs MativeElment
    mountNativeElment(virtualDOM, container)
  }
}
