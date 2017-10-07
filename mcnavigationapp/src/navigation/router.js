import React from 'react';
import { TabNavigator, StackNavigator } from "react-navigation";

import AboutScreen from '../screens/AboutScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CustomersScreen from '../screens/CustomersScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

const tabBarConfiguration = {
  headerMode: 'screen',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#ff6e00',
    inactiveTintColor: '#ffffff',
    showLabel: true,
    showIcon: true,
    style: {
      backgroundColor: '#3a3b4f',
    },
    labelStyle: {
      fontSize: 9,
    },
    indicatorStyle: {
      backgroundColor: '#ff6e00',
    },
  },
};

export const AllTabs = TabNavigator({
    Customers: {
      screen: CustomersScreen,
      navigationOptions: {
        header: null,  //Title: 'Customers',
        tabBarLabel: 'Customers',
        tabBarIcon: ({tintColor}) => <Icon name='group' size={20} color={tintColor} />,
      },
    },
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
  },
  {
    navigationOptions: { headerTintColor: '#3a3b4f' }
  },
  tabBarConfiguration,
);
