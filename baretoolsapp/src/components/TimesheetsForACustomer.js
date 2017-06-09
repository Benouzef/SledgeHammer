import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View, ListView, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class TimesheetsForACustomer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderRow(rowData) {
    console.log('rowDataChild!');
    console.log(rowData);

    var imgSource = {
      uri: 'http://www.execavenue.com/2016/wp-content/uploads/logo-finalcad-230x230.jpg',
    };

    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('TimesheetDetail')} underlayColor='rgba(0,0,0,0)'>

        <View>
          <View style={styles.row}>

            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData.amountOfWork}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    console.log('this.props.dataSource');
    console.log(this.props.dataSource[this.props.year]);
    return (
        <View>
          <Text>{this.props.customerName}</Text>
          <ListView contentContainerStyle={styles.list}
          dataSource={this.dataSource.cloneWithRows(this.props.dataSource[this.props.year])}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          />
        </View>
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
    addTimesheet: state.searchedTimesheets.addTimesheet,
    timesheets: state.searchedTimesheets.timesheets,
    fetchingTimesheets: state.searchedTimesheets.fetchingTimesheets
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetsForACustomer);
