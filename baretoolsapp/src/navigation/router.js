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
      headerTitle: 'Customer detail',
      tabBarLabel: 'Customers',
      tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
    },
  },
});

export const MissionsStack = StackNavigator({
  Missions: {
    screen: MissionsScreen,
    navigationOptions: {
      headerTitle: 'Missions',
      tabBarLabel: 'Missions',
      tabBarIcon: ({tintColor}) => <Icon name='calendar' size={20} color={tintColor} />,
    },
  },
  MissionDetail: {
    screen: MissionDetailScreen,
    navigationOptions: {
      headerTitle: 'Mission details',
      tabBarLabel: 'Missions',
      tabBarIcon: ({tintColor}) => <Icon name='calendar' size={20} color={tintColor} />,
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
  tabBarPosition: 'bottom',
  swipeEnabled: true,
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


export const Tabs = TabNavigator({
    Missions: {
      screen: MissionsStack,
    },
    Customers: {
      screen: CustomersStack,
    },
    Profile: {
      screen: ProfileStack,
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        headerTitle: 'About',
        tabBarLabel: 'About',
        tabBarIcon: ({tintColor}) => <Icon name='info-circle' size={20} color={tintColor} />,
      },
    },
  },
  tabBarConfiguration
);
