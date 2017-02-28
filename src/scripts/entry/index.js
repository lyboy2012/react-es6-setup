import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import {syncHistoryWithStore} from 'react-router-redux';


import {Router, browserHistory} from 'react-router';

const store = configureStore();
const history = syncHistoryWithStore(
    browserHistory,
    store
);

/**
 *
 * @type {{childRoutes: [*]}}
 */
const rootRoute = {
    childRoutes: [{
        path: '/',
        component: require('../components/index'),
        childRoutes: [
            require('../routes/about'),
            require('../routes/foo')
        ]
    }]
}


render(
    <Provider store={store}>
        <Router history={history} routes={rootRoute}/>
    </Provider>, document.getElementById('app'));
