import React, {Component} from 'react';
import HeaderContainer from './HeaderContainer';
import Common from '../common/index';

import {Input, Row, Col} from 'antd';
import LeftMenu from '../left-menu/index';
import './index.scss';
//export 不加default 出现加载不成功问题
export default class Foo extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <Row>
                    <Col md={6} lg={4}>
                        <LeftMenu/>
                    </Col>
                    <Col className="main-container" md={18} lg={20} >
                        <Common/>
                        <HeaderContainer/>

                        <Input placeholder="Basic usage"/>
                    </Col>
                </Row>

            </div>
        );
    }
}
