import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';



class HeaderContainer extends Component {

  render() {
    const { header } = this.props;
    return(
      <div>{header.txt}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    header:state.home.header
  }
}

export default connect(mapStateToProps)(HeaderContainer);
