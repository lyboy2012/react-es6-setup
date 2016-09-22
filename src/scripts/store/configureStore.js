import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middleware = process.env.NODE_ENV === 'production' ?
    [ thunk ] :
    [ thunk, logger() ];

export default function configureStore(initialState) {

  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
  
  return store
}


