import React from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <View style={{flexDirection: 'row'}}>
          <DatePicker
            style={{width: 160, marginLeft: 20, marginRight: 10 }}
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
            style={{width:50, marginLeft: 10, marginRight: 10 }}
          />

          <TouchableOpacity
            style={{
              borderRadius: 5,
              borderWidth: 0,
              marginRight: 10,
              marginTop: 5,
              marginBottom: 5
            }}
            onPress={() => this.test()}
          >
            <Icon name='check-circle-o' size={24} color='#28a9e1' style={{padding: 6}} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              //backgroundColor: '#28a9e1',
              borderRadius: 5,
              borderWidth: 0,
              //borderColor: '#000033',
              marginRight: 10,
              marginTop: 5,
              marginBottom: 5
            }}
            onPress={() => this.test()}
          >
            <Icon name='trash-o' size={24} color='#f54257' style={{padding: 6}}  />
          </TouchableOpacity>
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
