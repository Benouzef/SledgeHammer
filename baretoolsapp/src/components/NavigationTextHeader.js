import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class NavigationTextHeader extends Component {
  handleChange(text) {
    // Adding a new customer which name has been entered by the user
    // Adding default timesheet for created customer : by default timesheet for current month and current year
    var today = new Date();
    var month = today.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    this.props.addCustomer(text, today.getFullYear(), month, this.props.token);
  }

  render() {
      return(
        <TextInput placeholder='Add a customer' onSubmitEditing={(event) => this.handleChange(event.nativeEvent.text)} />
      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    addCustomer: state.firebaseReducer.addCustomer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTextHeader);
