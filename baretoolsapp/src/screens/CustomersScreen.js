import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, Button, TouchableHighlight, View, ListView, TextInput, Image, WebView } from 'react-native';

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
    console.log('rowData', rowData);
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('CustomerDetail', { customerDetail:  rowData })} underlayColor='rgba(0,0,0,0)'>
        <View>
          <View style={styles.row}>

            <WebView
              source={{uri: `https://logo.clearbit.com/${rowData.url}`}}
              style={styles.thumb}
            />

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
    let showActivityIndicator = false;
    let itemsForTheList = [];
    if (this.props.fetching === false) isReady = true;
    if (this.props.fetching) isReady = false;

    if (isReady) {
      itemsForTheList = this.props.customers
      readonlyMessage = null;
      let showActivityIndicator = false;
    } else {
      itemsForTheList = []
      readonlyMessage = <Text style={styles.loading}>Loading...</Text>
      let showActivityIndicator = true;
    }

    return (
      <ScrollView>
          {readonlyMessage}
          <ListView contentContainerStyle={styles.list}
          dataSource={this.dataSource.cloneWithRows(itemsForTheList)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          />
          {showActivityIndicator && (
            <ActivityIndicator
              style={{ height: 80 }}
              color="#C00"
              size="large"
            />
          )}
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
    width: 150,
    height: 170,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 128,
    height: 128
  },
  text: {
    flex: 0.25,
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
    customers: state.firebaseReducer.customers.items,
    fetching: state.firebaseReducer.customers.inProgress
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);
