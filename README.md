#react webpack es6 
1. npm init
2. npm install react react-dom --save-dev
3. npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev
4. touch index.html App.js main.js webpack.config.js
5. sudo npm install babel webpack webpack-dev-server 

#react sublime 插件
1.语法高亮 babel-sublime
2.React ES6 Snippets 自动完成
```
cdm→  componentDidMount: fn() { ... }

   cdup→  componentDidUpdate: fn(pp, ps) { ... }

     cs→  import cx from 'classnames';

    cwm→  componentWillMount: fn() { ... }

    cwr→  componentWillReceiveProps: fn(np) { ... }

    cwu→  componentWillUpdate: fn(np, ns) { ... }

   cwun→  componentWillUnmount: fn() { ... }

     cx→  cx({ ... })

    fdn→  React.findDOMNode(...)

    fup→  forceUpdate(...)

    gdp→  static defaultProps = { ... } 

    gis→  getInitialState: fn() { return {...} } 

    ism→  isMounted()

  props→  this.props.

     pt→  propTypes { ... }

    rcc→  component skeleton

   refs→  this.refs.

    ren→  render: fn() { return ... }

    rrc→  redux component skeleton

    scu→  shouldComponentUpdate: fn(np, ns) { ... }

    sst→  this.setState({ ... })

  state→  this.state.
```
3.Emmet (ctrl+e) 扩展jsx 语法

#react 的使用 问题
```javascript
```

4.js pretty  react 格式化错乱问题
```
Preferences > Package Settings > HTML\CSS\JS Prettify > Set Prettify Preferences
"e4x": true
```
5.react-redux 开发步骤
```
1、Provider 绑定 store （context）getChildContext 较少props 层级传递问题
2、拆分Container（就是个组件）通过connect  连接react 和store 定义props 过滤和action操作
3、定义actioncreater
4、定义reducer

注意connet 第二个参数
如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数
```
5.antdesign 引入组件文件过大问题 .babelrc
```
{
  "plugins": [
    ["import", { libraryName: "antd", style: "css" }]
  ,["transform-runtime"]
  ]
}
```