/**
 * Created by liying on 2017/3/2.
 */
import * as types from '../constants';


export function pushRouter(pathname) {

    return {
        type: types.PUSH_ROUTER,
        pathname: pathname
    }
}