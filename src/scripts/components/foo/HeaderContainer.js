import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getHeader } from '../../actions';


class HeaderContainer extends Component {

  render() {
    const { header,getHeader } = this.props;
    return(
      <div>
        <div>{header.text}</div>
        <button onClick={getHeader}>修改</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    header:state.home.header
  }
}

export default connect(mapStateToProps, { getHeader })(HeaderContainer);
