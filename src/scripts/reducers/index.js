import { combineReducers } from 'redux';
import home from './home';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  home,
  routing: routerReducer
  //会把new 作为 state 一个属性赋值 
});

