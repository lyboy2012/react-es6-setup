/**
 * Created by liying on 2017/2/27.
 */
import './index.scss'
import React, {
    Component,
    PropTypes,
} from 'react';

import {Row, Col, Menu, Icon} from 'antd';
import {IndexLink} from 'react-router';
import {push} from 'react-router-redux';
import {pushRouter} from '../../actions/routerAction';
import {connect} from 'react-redux';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class GlobalNav extends Component {
    constructor() {
        super();

    }

    handleClick(e) {
        this.props.pushRouter(e.key);
    }

    render() {

        const {selectedKeys, pushRouter} = this.props;
        return (
            <header className="header">
                <Row>
                    <Col span={5}>
                        <IndexLink to="/" className="logo">liying</IndexLink>
                    </Col>
                    <Col span={19}>
                        <Menu
                            onClick={this.handleClick.bind(this)}
                            selectedKeys={selectedKeys}
                            mode="horizontal" className="nav">
                            <Menu.Item key="/">
                                首页
                            </Menu.Item>
                            <Menu.Item key="/about">
                                关于我们
                            </Menu.Item>
                            <SubMenu title={<span><Icon type="setting"/>设置</span>}>
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <Menu.Item key="/foo">
                                foo
                            </Menu.Item>
                        </Menu>

                    </Col>
                </Row>

            </header>
        );
    }
}

GlobalNav.propTypes = {};
GlobalNav.defaultProps = {};

function mapStateToProps(state) {
    return {
        selectedKeys: [state.routing.locationBeforeTransitions.pathname]
    }
}
export default connect(mapStateToProps, {pushRouter})(GlobalNav);


