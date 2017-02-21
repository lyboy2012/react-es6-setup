import { createStore, applyMiddleware ,compose} from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import logger from 'redux-logger';
/*import thunk from 'redux-thunk';*/
import rootReducer from '../reducers/index';
import rootEpic from '../epics';
const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = process.env.NODE_ENV === 'production' ?
    [ epicMiddleware ] :
    [ epicMiddleware, logger() ];

export default function configureStore(initialState) {

  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
  return store
}



