import React from 'react';
import { TabNavigator, StackNavigator } from "react-navigation";

import AboutScreen from '../screens/AboutScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CustomersScreen from '../screens/CustomersScreen';

import MissionDetailScreen from '../screens/MissionDetailScreen';
import MissionsScreen from '../screens/MissionsScreen';

import ProfileScreen from '../screens/ProfileScreen';
import SignatureStampScreen from '../screens/SignatureStampScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

import TimesheetsScreen from '../screens/TimesheetsScreen';
import TimesheetDetailScreen from '../screens/TimesheetDetailScreen';

import { connect } from 'react-redux';
import { ActionCreators } from '../actions';

// TODO: Delete CustomersStack
/*
export const CustomersStack = StackNavigator({
  Customers: {
    screen: CustomersScreen,
    navigationOptions: {
      headerTitle: 'Customers',
      tabBarLabel: 'Customers',
      tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
    },
  },
  CustomerDetail: {
    screen: CustomerDetailScreen,
    navigationOptions: {
      tabBarLabel: 'Customers',
      tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
    },
  },
});
*/
/*
export const TimesheetsStack = StackNavigator({
  Timesheets: {
    screen: TimesheetsScreen,
    navigationOptions: {
      tabBarLabel: 'Timesheets',
      headerTitle: 'Timesheets',
      tabBarIcon: ({tintColor}) => <Icon name='calendar' size={20} color={tintColor} />,
    },
  },
  TimesheetDetail: {
    screen: TimesheetDetailScreen,
    navigationOptions: {
      headerTitle: 'Timesheet details',
      tabBarLabel: 'Timesheets',
      tabBarIcon: ({tintColor}) => <Icon name='calendar' size={20} color={tintColor} />,
    },
  },
});
*/
export const MissionsStack = StackNavigator({
  Missions: {
    screen: MissionsScreen,
    navigationOptions: {
      headerTitle: 'Missions',
      tabBarLabel: 'Missions',
      tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
    },
  },
  MissionDetail: {
    screen: MissionDetailScreen,
    navigationOptions: {
      headerTitle: 'Mission details',
      tabBarLabel: 'Missions',
      tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
    },
  },
});

export const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: 'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => <Icon name='user-circle' size={20} color={tintColor} />,
    },
  },
  SignatureStamp: {
    screen: SignatureStampScreen,
    navigationOptions: {
      headerTitle: 'Signature Stamp',
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => <Icon name='user-circle' size={20} color={tintColor} />,
    },
  },
});

const tabBarConfiguration = {
  headerMode: 'screen',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    inactiveTintColor: '#ffffff',
    showLabel: true,
    showIcon: true,
    style: {
      backgroundColor: 'blue',
    },
    labelStyle: {
      fontSize: 9,
    },
    indicatorStyle: {
      backgroundColor: 'red',
    },
  },
};


export const AllTabs = TabNavigator({
    /*Timesheets: {
      screen: TimesheetsStack,
    },*/
    /*
    Customers: {
      screen: CustomersStack,
    },
    */
    Timesheets: {
      screen: TimesheetsScreen,
      navigationOptions: {
        tabBarLabel: 'Timesheets',
        headerTitle: 'Timesheets',
        tabBarIcon: ({tintColor}) => <Icon name='calendar' size={20} color={tintColor} />,
      },
    },
    Customers: {
      screen: CustomersScreen,
      navigationOptions: {
        headerTitle: 'Customers',
        tabBarLabel: 'Customers',
        tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
      },
    },
    //TODO : Reactivate Profile Stack for user profile information
    /*Profile: {
      screen: ProfileStack,
    },*/
    About: {
      screen: AboutScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'About',
        tabBarIcon: ({tintColor}) => <Icon name='info-circle' size={20} color={tintColor} />,
      },
    },
  },
  tabBarConfiguration
);

export const Tabs = StackNavigator({
    Root: {
      screen: AllTabs,
    },
    CustomerDetail: {
      screen: CustomerDetailScreen,
      navigationOptions: {
        tabBarLabel: 'Customers',
        tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
      },
    },
    TimesheetDetail: {
      screen: TimesheetDetailScreen,
      navigationOptions: {
        tabBarLabel: 'Timesheets',
        tabBarIcon: ({tintColor}) => <Icon name='calendar' size={20} color={tintColor} />,
      },
    },
  },
  tabBarConfiguration
);




function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState,
    addCustomer: state.searchedCustomers.addCustomer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
