import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class NavigationTextHeader extends Component {
  handleChange(text) {
    console.log('text');
    console.log(text);
    this.props.addCustomer(text);
  }

  render() {
      return(
        <TextInput placeholder='Add a customer' onSubmitEditing={(event) => this.handleChange(event.nativeEvent.text)}/>
      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    addCustomer: state.searchedCustomers.addCustomer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTextHeader);
