import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

// Import screen components from ./screens folder
import Dashboard from './screens/Dashboard';
import Leads from './screens/Leads';
import FollowUps from './screens/FollowUps';
import SalesActivity from './screens/SalesActivity';
import Products from './screens/Products';
import Notifications from './screens/Notifications';
import Settings from './screens/Settings';
import AddLeadPage from './screens/AddLeadPage';
import FilterPage from './screens/FilterPage';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Leads" component={Leads} />
        <Drawer.Screen name="Follow Ups" component={FollowUps} />
        <Drawer.Screen name="Sales Activity" component={SalesActivity} />
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="Settings" component={Settings} />
       <Drawer.Screen name="AddLeadPage" component={AddLeadPage} />
        < Drawer.Screen name="FilterPage" component={FilterPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
