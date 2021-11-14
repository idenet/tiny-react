import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDomElelment from './createDomElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 旧的组件的实例对象
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // 判断oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
    // 如果两者类型不相同
  } else if (
    virtualDOM.type !== oldVirtualDOM.type &&
    typeof virtualDOM.type !== 'function'
  ) {
    const newElement = createDomElelment(virtualDOM)
    // 替换元素
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
    // 渲染组件
  } else if (typeof virtualDOM.type === 'function') {
    //
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
    // 存在oldVdom，且两者类型相同
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容 找到差异更新到真实dom oldDOM
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
    // 循环子元素，将子元素进行更新
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    // 判断旧节点的数量
    if (oldChildNodes / length > virtualDOM.children.length) {
      // 有节点需要被删除
      for (
        let i = oldChildNodes.length - 1;
        i > virtualDOM.children.length - 1;
        i--
      ) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}
