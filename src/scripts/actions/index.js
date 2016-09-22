import * as types from '../constants';
import list from '../api';

//显示所有消息
export function addInfo() {
  return {
    type: types.ADD_INFO
  }
}
/*export function test(icpNumber, ispId) {
    return (dispatch, getState) => {
      dispatch(showNews());

      return fetchConfigService(icpNumber, ispId, function(json){//返回的是promise 可以连续调用
          dispatch(configReceive(json))
      });
    }
} */
export function showInfo() {
  return {
    type: types.SHOW_INFO
  }
}

//显示banner内容
export function showHeader(header) {
  return {
    type: types.SHOW_HEADER,
    header: header
  }
}

//异步测试
export function addInfoWait() {
  return function(dispatch, getState) {
    dispatch(showInfo());
    setTimeout(function() {
      dispatch(addInfo());
    }, 2000)
  }
}
export function subInfo() {
  return {
    type: types.SUB_INFO
  }
}


export function showList(list) { //显示列表数据
  return {
    type: types.SHOW_LIST,
    list: list
  }
}

//getlist
export function getList() {
  return function(dispatch, getState) {
    list.getListByPageNo('', function(list) {
      dispatch(showList(list));
    });
  }
}
