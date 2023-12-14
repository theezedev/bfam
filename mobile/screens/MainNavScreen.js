import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppContext from '../AppContext';
import SettingsScreen from './SettingsScreen';
import FamScreen from './FamScreen';
import FeedScreen from './FeedScreen';

const Tab = createBottomTabNavigator();


const Screen1 = () => (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Coming soon...</Text>
  </SafeAreaView>
);

const MainNavScreen = () => {

  return (
    <Tab.Navigator      
      screenOptions={({ route }) => ({
        // activeTintColor: '#3867c7',
        headerStyle: {
          backgroundColor: '#3867c7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Family') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Fam') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          }
          color = focused ? '#3867c7' : 'grey';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: true }}/>
      <Tab.Screen name="Family" component={FamScreen} options={{ headerShown: true }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }}/>
    </Tab.Navigator>
  );
};

export default MainNavScreen;
