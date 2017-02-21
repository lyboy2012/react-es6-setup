import * as types from '../constants';
const initialState ={
  header:{
      text:'初始化的header内容'
  }
};

export default function header(state = initialState, action) {
  switch(action.type) {
     case types.SHOW_HEADER:
      return Object.assign({}, state, {
        header: action.header
      });
    default:
      return state;
  }
}