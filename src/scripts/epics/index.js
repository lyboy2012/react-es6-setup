import { combineEpics } from 'redux-observable';
import changHeader from './changHeader';


export default combineEpics(
    changHeader
);
