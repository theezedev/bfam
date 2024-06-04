import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './FeedScreen';
import PostDetailsScreen from './PostDetailsScreen';
import NewPostScreen from './NewPostScreen';

const Stack = createStackNavigator();

const FeedNavScreen = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Feed" component={FeedScreen} options={{headerShown: false}}  />
      <Stack.Screen name="Details" component={PostDetailsScreen} 
        options={{
          headerShown: true,
          headerTintColor: '#3867c7',
          headerStyle: {
            elevation: 0, // For Android
            shadowOpacity: 0, // For iOS
            borderBottomWidth: 0, // If there's a border at the bottom
          },
        }}
        />
      <Stack.Screen name="New Post" component={NewPostScreen} 
        options={{
          headerShown: true,
          headerTintColor: '#3867c7',
          headerStyle: {
            elevation: 0, // For Android
            shadowOpacity: 0, // For iOS
            borderBottomWidth: 0, // If there's a border at the bottom
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedNavScreen;
