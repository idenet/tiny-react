import TinyReact from './TinyReact'

const root = document.getElementById('root')

// const virtualDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2>(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>(观察: 这个将会被改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击我</button>
//     <h3>这个将会被删除</h3>
//     2, 3
//   </div>
// )

// TinyReact.render(virtualDOM, root)

// function Demo() {
//   return <div>hello</div>
// }

// const Heart = () => <Demo></Demo>

// TinyReact.render(<Heart></Heart>, root)

// class Alert extends TinyReact.Component {
//   // 通过父类拿到props
//   constructor(props) {
//     super(props)
//     this.state = {
//       title: 'default Title',
//     }
//     this.handleClick = this.handleClick.bind(this)
//   }
//   handleClick() {
//     this.setState({
//       title: 'changed title',
//     })
//   }
//   render() {
//     console.log(this.state)
//     return (
//       <div>
//         {this.props.name} {this.props.age}
//         <div>
//           {this.state.title}
//           <button onClick={this.handleClick}>改变title</button>
//         </div>
//       </div>
//     )
//   }
// }
class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Default Title',
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ title: 'Changed Title' })
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <div>
          {this.state.title}
          <button onClick={this.handleClick}>改变Title</button>
        </div>
      </div>
    )
  }
}

// TinyReact.render(<Alert name="臧三" age={20}></Alert>, root)

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // console.log(this.input.value)
    console.log(this.input)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.handleClick}>按钮</button>
        <Alert ref={(alert) => (this.alert = alert)} name="张三" age={20} />
      </div>
    )
  }
}
TinyReact.render(<DemoRef></DemoRef>, root)
