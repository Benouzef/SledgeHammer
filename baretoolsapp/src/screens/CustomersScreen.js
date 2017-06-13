import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, TouchableHighlight, View, ListView, TextInput, Image, WebView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import NavigationTextHeader from '../components/NavigationTextHeader';

class CustomersScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
      headerRight: <NavigationTextHeader token={screenProps} />
      });

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderRow(rowData) {
    var imgSource = {
      uri: 'http://www.execavenue.com/2016/wp-content/uploads/logo-finalcad-230x230.jpg',
    };

    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('CustomerDetail')} underlayColor='rgba(0,0,0,0)'>

        <View>
          <View style={styles.row}>

            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {

    let isReady = false;
    if (this.props.fetching === false) isReady = true;
    if (this.props.fetching) isReady = false;

    if (isReady) {
      items = this.props.customers
      readonlyMessage = null;
    } else {
      items = []
      readonlyMessage = <Text style={styles.loading}>Loading...</Text>
    }

    return (
      <ScrollView>
        {readonlyMessage}




          <ListView contentContainerStyle={styles.list}
          dataSource={this.dataSource.cloneWithRows(items)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  loading: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    addCustomer: state.searchedCustomers.addCustomer,
    customers: state.searchedCustomers.customers,
    fetching: state.searchedCustomers.fetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);
