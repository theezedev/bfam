import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import AppContext from '../AppContext';
import SettingsScreen from './SettingsScreen';
import FamScreen from './FamScreen';
// import FeedScreen from './FeedScreen';
import FeedNavScreen from './FeedNavScreen';
import MyBFamsModal from '../modals/MyBFamsModal';
import FamNavScreen from './FamNavScreen';

const Tab = createBottomTabNavigator();

const MainNavScreen = () => {
  const [selectedModal, setSelectedModal] = useState(null);

  const handleCloseModal = () => {
    setSelectedModal(null);
  };

  const handleOpenModal = (modalType) => {
    setSelectedModal(modalType);
  };


  return (
    // <View>
    <React.Fragment>
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

            if (route.name === 'FeedNav') {
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
        <Tab.Screen
          name="FeedNav"
          component={FeedNavScreen}
          options={{
            headerShown: true,
            title: 'bFam',
            headerRight: () => (
              <TouchableOpacity onPress={() => { handleOpenModal('MyBFamsModal') }} style={{marginRight:10}}>
                <MatIcon name={'account-child-circle'} size={30} color={'#fff'} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Family" component={FamNavScreen} options={{ headerShown: true }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }}/>
      </Tab.Navigator>

      <MyBFamsModal
        visible={selectedModal === 'MyBFamsModal'}
        onClose={handleCloseModal}
        onCreateFam={(famName) => {
          handleCloseModal();
        }}
      />
    </React.Fragment>

  );
};

export default MainNavScreen;
