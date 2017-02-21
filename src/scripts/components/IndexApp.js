/**
 * Created by liying on 2017/2/16.
 */
import React, { Component } from 'react'
import {Router, Route, Link, IndexRoute, browserHistory,hashHistory} from 'react-router';
const ACTIVE = {color: 'red'}
const IndexAppPage = () => (
    <div>
        <h2>IndexAppPage</h2>
    </div>
)
class IndexApp extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/" activeStyle={ACTIVE}>/</Link></li>
                    <li><Link to="/home" activeStyle={ACTIVE}>/home</Link></li>
                    <li><Link to="/index" activeStyle={ACTIVE}>/index</Link></li>
                </ul>
                <div style={{ padding: 20 }}>
                    {this.props.children || <IndexAppPage  />}
                </div>
            </div>
        )
    }
}

export default IndexApp