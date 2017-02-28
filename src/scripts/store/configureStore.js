import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import logger from 'redux-logger';
/*import thunk from 'redux-thunk';*/
import rootReducer from '../reducers/index';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import rootEpic from '../epics';


export default function configureStore(initialState) {
    const epicMiddleware = createEpicMiddleware(rootEpic);
    const middleware = process.env.NODE_ENV === 'production' ?
        [epicMiddleware, routerMiddleware(browserHistory)] :
        [epicMiddleware, logger(), routerMiddleware(browserHistory)];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: 'wf', actionsBlacklist: ['REDUX_STORAGE_SAVE']
            }) : compose;


    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
}



