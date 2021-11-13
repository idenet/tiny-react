import createDomElelment from './createDomElement'
import unmountNode from './unmountNode'
export default function mountNativeElment(virtualDOM, container, oldDOM) {
  let newElment = createDomElelment(virtualDOM)
  // 判断旧的DOM对象是否再存，如果存在，则删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  // 将转换之后的对象，放置到页面中·
  container.appendChild(newElment)

  // 获取实例对象
  let component = virtualDOM.component
  // 类组件才存在
  if (component) {
    component.setDOM(newElment)
  }
}
