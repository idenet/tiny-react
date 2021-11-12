export default function updateNodeElement(newElment, virtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props
  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    // 判断属性是否是事件属性 onClick -> click
    if (propName.slice(0, 2) === 'on') {
      // 事件名称
      const eventName = propName.toLocaleLowerCase().slice(2)
      // 为元素添加事件
      newElment.addEventListener(eventName, newPropsValue)
    } else if (propName === 'value' || propName === 'checked') {
      newElment[propName] = newPropsValue
    } else if (propName !== 'children') {
      if (propName === 'className') {
        newElment.setAttribute('class', newPropsValue)
      } else {
        newElment.setAttribute(propName, newPropsValue)
      }
    }
  })
}
