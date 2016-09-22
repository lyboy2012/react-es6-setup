import React, { Component } from 'react';
import HeaderContainer from './HeaderContainer';
//export 不加default 出现加载不陈成功问题i
//
export default class App extends Component {
  render() {
    return (
      <HeaderContainer/>
    );
  }
}
