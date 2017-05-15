import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import AboutScreen from '../screens/AboutScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CustomersScreen from '../screens/CustomersScreen';
import MissionDetailScreen from '../screens/MissionDetailScreen';
import MissionsScreen from '../screens/MissionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignatureScreen from '../screens/SignatureScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  /*home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,*/
  missions: () => MissionsScreen,
  missiondetail: () => MissionDetailScreen,
  customers: () => CustomersScreen,
  profile: () => ProfileScreen,
  signature: () => SignatureScreen,
  about: () => AboutScreen,
  rootNavigation: () => RootNavigation,

}));
