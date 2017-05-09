import React from 'react';
import { TabNavigator, StackNavigator } from "react-navigation";

import AboutScreen from '../screens/AboutScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CustomersScreen from '../screens/CustomersScreen';

export const CustomersStack = StackNavigator({
  Customers: {
    screen: CustomersScreen,
  },
  CustomerDetail: {
    screen: CustomerDetailScreen,
  },
});

export const Tabs = TabNavigator({
  Customers: {
    screen: CustomersStack,
  },
  About: {
    screen: AboutScreen,
  },
});
