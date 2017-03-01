import * as types from '../constants';


export function getHeader(header) {
    return {
        type: types.GET_HEADER,
        header: header
    }
}
//显示banner内容
export function showHeader(header) {
    return {
        type: types.SHOW_HEADER,
        header: header
    }
}


