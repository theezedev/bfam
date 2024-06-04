import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FamScreen from './FamScreen';
import FamDetailsScreen from './FamDetailsScreen';

const Stack = createStackNavigator();

const FamNavScreen = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="FamScreen" component={FamScreen} options={{headerShown: false}}  />
      <Stack.Screen name="FamDetails" component={FamDetailsScreen} 
        options={{
          headerShown: true,
          headerTintColor: '#3867c7',
          headerStyle: {
            elevation: 0, // For Android
            shadowOpacity: 0, // For iOS
            borderBottomWidth: 0, // If there's a border at the bottom
          },
          headerTitle:'Details',
          headerBackTitle:'Family',
        }}
        />
    </Stack.Navigator>
  );
};

export default FamNavScreen;
