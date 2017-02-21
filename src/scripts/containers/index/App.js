import React, {Component} from 'react';
import HeaderContainer from './HeaderContainer';

import { Input } from 'antd';
//export 不加default 出现加载不陈成功问题i
//
export default class App extends Component {
    render() {
        return (
            <div>
                <HeaderContainer/>

                <Input placeholder="Basic usage" />
            </div>
        );
    }
}
