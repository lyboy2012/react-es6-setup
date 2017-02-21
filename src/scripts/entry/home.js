import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Index from '../containers/index/App';
import Home from '../containers/home/App';
//import { showHeader } from '../actions';

import {Router, Route, Link, IndexRoute, browserHistory,hashHistory} from 'react-router';

const store = configureStore();
//store.dispatch(showHeader({ text: "测试Header 文本内容" } ));

const ACTIVE = {color: 'red'}
const App = ({children}) => (
    <div>
        <h1>APP!</h1>
        <ul>
            <li><Link to="/" activeStyle={ACTIVE}>/</Link></li>
            <li><Link to="/home" activeStyle={ACTIVE}>/home</Link></li>
            <li><Link to="/index" activeStyle={ACTIVE}>/index</Link></li>
        </ul>

        {children}
    </div>
)
const IndexApp = () => (
    <div>
        <h2>Index!</h2>
    </div>
)
render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={IndexApp}/>
                <Route path="index" component={Index}/>
                <Route path="home" component={Home}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('app'));
