/**
 * Created by liying on 2017/2/16.
 */
export default {
    path: 'about',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/index'))
        })
    }
}