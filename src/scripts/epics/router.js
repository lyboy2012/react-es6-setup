/**
 * Created by liying on 2017/2/28.
 */
import * as types from '../constants';
import {push} from 'react-router-redux';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

export default function pushRouter(action$) {
    return action$.ofType(types.PUSH_ROUTER)
        .map((pathname) => push(pathname))
}