import React, {Component} from 'react';
import { Tabs } from './navigation/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs screenProps={this.props.userAccessToken} {...this.props} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState,
    customers: state.customers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
