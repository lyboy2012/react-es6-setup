
import React , { Component, PropTypes } from 'react';
import Common from '../common/index';
import Test from '../test';
import './index.scss';
class App extends Component {
  render(){
    /**
     * 根元素必须是唯一
     */
    let {txt,cat} = this.props;
    return (
      <div>
        <h1>{this.props.txt}</h1>
        <b>{txt}</b>
        <h3 className="test">{cat}</h3>
        <Button><Heart/>click me ddd !</Button>
        <Common/>
        <Test/>
      </div>
    );
  }
}


App.propTypes = {
  txt: PropTypes.string,
  cat: PropTypes.number.isRequired
}
App.defaultProps = {
  txt: 'this is txt default value'
}

class Button extends Component {
  render(){
    return <button>{this.props.children}</button>
  }
}
  const Heart = () => <span className="heart" /* 注释内容*/><span className="test"></span></span>

//不维护state 可以用 function  提高效率

//const App = () => <h1>function </h1>
export default App;




