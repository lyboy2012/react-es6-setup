/**
 * Created by liying on 2017/2/16.
 */
import React, { Component } from 'react'
import GlobalNav from './GlobalNav'
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
                <div style={{ padding: 20 }}>
                    {this.props.children || <IndexAppPage  />}
                </div>
            </div>
        )
    }
}

export default IndexApp