import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  About,
  Home,
  Liked,
  SplashScreen,
  Welcome,
  Detail,
  Instruction,
  FavoriteScreen,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BannerAds, BottomNavigator} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Instruction"
        component={Instruction}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
