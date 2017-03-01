/**
 * Created by liying on 2017/2/16.
 */
import React, { Component } from 'react';
import GlobalNav from './global-nav';
import Footer from './footer'
const IndexAppPage = () => (
    <div>
        <h2>默认首页</h2>
    </div>
)
class IndexApp extends Component {
    render() {
        return (
            <div className="page-wrapper">
                <GlobalNav/>
                {this.props.children || <IndexAppPage  />}
                <Footer/>
            </div>
        )
    }
}

export default IndexApp