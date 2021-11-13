import diff from './diff'

export default function render(
  virtualDOM,
  container,
  // 拿到第一个元素
  oldDOM = container.firstChild
) {
  diff(virtualDOM, container, oldDOM)
}
