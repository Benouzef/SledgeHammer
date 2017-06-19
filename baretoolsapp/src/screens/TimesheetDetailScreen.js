import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, ListView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';


class TimesheetDetailScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  addDayToCurrentTimesheet(customerId, year, month, day, amount, token) {
    //customerId, year, month, day, amount, token
    this.props.addDayToCurrentTimesheet(customerId, year, month, day, amount, token);
  }

  renderRow(rowData, sectionID, rowID) {

    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowID} / {rowData.amount}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Timesheet Detail Screen</Text>
        <Text>{params.timesheetDetail.lastStatus}</Text>
        <Text>{params.missionType}</Text>

        <Button title="Add" onPress={() => this.addDayToCurrentTimesheet(params.customerId, params.year, params.month, 21, 1, params.token)}/>
        <ListView contentContainerStyle={styles.list}
        dataSource={this.dataSource.cloneWithRows(params.timesheetDetail.enteredData)}
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
    addDayToCurrentTimesheet: state.searchedTimesheets.addDayToCurrentTimesheet,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetDetailScreen);
