import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from '../containers/index/App';
import { showHeader } from '../actions';
const store = configureStore();
store.dispatch(showHeader({ text: "测试Header 文本内容" } ));
render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('app'));
