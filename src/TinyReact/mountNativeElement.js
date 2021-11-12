import mountElement from './mountElement'
import createDomElelment from './createDomElement'
export default function mountNativeElment(virtualDOM, container) {
  let newElment = createDomElelment(virtualDOM)
  // 将转换之后的对象，放置到页面中·
  container.appendChild(newElment)
}
