import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';


import {Router, Route, Link, IndexRoute, browserHistory,hashHistory} from 'react-router';

const store = configureStore();
//store.dispatch(showHeader({ text: "测试Header 文本内容" } ));




const rootRoute = {
    childRoutes: [ {
        path: '/',
        component: require('../components/IndexApp'),
        childRoutes: [
            require('../routes/home'),
            require('../routes/index')
        ]
    } ]
}

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={rootRoute} />
    </Provider>, document.getElementById('app'));
