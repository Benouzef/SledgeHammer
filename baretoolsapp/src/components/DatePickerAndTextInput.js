import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class DatePickerAndTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      amount: this.props.amount
    };
  }

  test() {
    console.log('state', state);
  }

  render() {
      return(
        <View>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <TextInput
            placeholder='Amount of work'
            keyboardType='numeric'
            value={this.state.amount.toString()}
            onChangeText={(amount) => this.setState({amount})}
          />
          <Button title="Save" onPress={() => this.test()}/>
          <Button title="Delete" onPress={() => this.test()}/>
        </View>
      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    addCustomer: state.firebaseReducer.addCustomer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerAndTextInput);
