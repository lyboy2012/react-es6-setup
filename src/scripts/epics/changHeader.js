import * as types from '../constants';
import { showHeader } from '../actions';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

export default function fetchHeaderInfo(action$) {
    return action$.ofType(types.GET_HEADER)
        .delay(2000)
        .map(showHeader.bind(null, {text:'返回的内容'}));
}