import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: [
        { title: 'All Customers', value: 'ALLCUSTOMERS' },
        { title: 'FINALCAD', value: 'FINALCAD' },
        { title: 'Any time', value: 'ANYTIME' },
        { title: 'Q2 2017', value: 'Q22017' },
        { title: 'Q1 2017', value: 'Q12017' },
      ],
    };
  }
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default MainActivity;
