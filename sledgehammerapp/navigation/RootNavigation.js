import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="missions">
        <TabNavigationItem
          id="missions"
          renderIcon={isSelected => this._renderIcon('calendar', isSelected)}>
          <StackNavigation initialRoute="missions" />
        </TabNavigationItem>
        <TabNavigationItem
          id="customers"
          renderIcon={isSelected => this._renderIcon('group', isSelected)}>
          <StackNavigation initialRoute="customers" />
        </TabNavigationItem>
        <TabNavigationItem
          id="profile"
          renderIcon={isSelected => this._renderIcon('user-circle', isSelected)}>
          <StackNavigation initialRoute="profile" />
        </TabNavigationItem>
        <TabNavigationItem
          id="about"
          renderIcon={isSelected => this._renderIcon('info-circle', isSelected)}>
          <StackNavigation initialRoute="about" />
        </TabNavigationItem>
      </TabNavigation>

/*

      <TabNavigation tabBarHeight={56} initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="links"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}>
          <StackNavigation initialRoute="links" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
      */
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
