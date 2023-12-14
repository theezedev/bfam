import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

const CreateBfamScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Create a bfam</Text>
    <Button
      title="Continue"
      onPress={() => navigation.navigate('SetupDetails', { action: 'create' })}
    />
  </View>
);

const JoinBfamScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Join a bfam</Text>
    <Button
      title="Continue"
      onPress={() => navigation.navigate('SetupDetails', { action: 'join' })}
    />
  </View>
);

const SetupDetailsScreen = ({ route }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{route.params.action === 'create' ? 'Create' : 'Join'} details screen</Text>
    {/* Further UI/components for setting up details */}
  </View>
);

const SetupNavScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CreateBfam" component={CreateBfamScreen} />
        <Stack.Screen name="JoinBfam" component={JoinBfamScreen} />
        <Stack.Screen name="SetupDetails" component={SetupDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SetupNavScreen;
