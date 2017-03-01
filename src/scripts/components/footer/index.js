/**
 * Created by liying on 2017/3/1.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import './index.scss'
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <p className="copyright">
                    © 2016-2017 cailine.com 版权所有 ICP证：京A1-20160101
                </p>
            </footer>
        );
    }
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
