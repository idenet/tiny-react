import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElelment from './createDomElement'
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
    const newElement = createDOMElelment(virtualDOM)
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

    // 1. 将拥有key属性的子元素 放置在一个单独的对象中
    let keyedElements = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0

    if (hasNoKey) {
      // 循环子元素，将子元素进行更新
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 2. 循环 vdom 的子元素， 获取子元素的key 属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 有节点需要被删除
        for (
          let i = oldChildNodes.length - 1;
          i > virtualDOM.children.length - 1;
          i--
        ) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false
          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          if (!found) {
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}
