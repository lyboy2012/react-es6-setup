import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { changHeader } from '../../actions';


class HeaderContainer extends Component {

  render() {
    const { header,changHeader } = this.props;
    return(
      <div>
        <div>{header.text}</div>
        <button onClick={changHeader}>修改</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    header:state.home.header
  }
}

export default connect(mapStateToProps, { changHeader })(HeaderContainer);
