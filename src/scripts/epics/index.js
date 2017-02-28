import { combineEpics } from 'redux-observable';
import changHeader from './changHeader';
import router from './router'


export default combineEpics(
    changHeader,
    router
);
