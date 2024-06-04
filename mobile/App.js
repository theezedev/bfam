import 'react-native-gesture-handler';
import 'intl-pluralrules';
import * as SecureStore from 'expo-secure-store';

import React, { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from './translations/en.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import AppContext from './AppContext';
import MainNavScreen from './screens/MainNavScreen';
import LoginScreen from './screens/LoginScreen';


import globals from './globals';
const gloStyles = require('./gloStyles'); //Global Styles
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation,
        },
      },
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
}

const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./assets/icon.png')} style={styles.profileImage} />
      <Text style={{marginBottom:15,color:'#3867c7'}}>Loading...</Text>
      <ActivityIndicator size="large" color="#3867c7"/>
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [ userToken, setUserToken ] = useState('');
  const [ selectedBFam, setSelectedBFam ] = useState('');
  const [ userID, setUserID ] = useState('');


  const getUserInfo = async (userID) => {
    try {
      userID = userID.replaceAll('"','');
      const response = await fetch(`${globals.apiUrl}getUserInfo?user=${userID}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userInfo = await response.json();  
      await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));
      
      setSelectedBFam(userInfo[0].bfamID);
      setUserID(userInfo[0].userID);

      return userInfo;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  };

  const getUserToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        setUserToken(token);
        return getUserInfo(token); // Return the result of getUserInfo here
      } else {
        console.warn('Token not found.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Unknown error while getting userToken:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserToken().then((userInfo) => {
      if (userInfo !== null) {
        // If userInfo exists, set selectedBFam
        setSelectedBFam(userInfo[0].bfamID);
      }
    });
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  //WARNING
  const deleteUserToken = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setUserToken(null); // Set userToken in context to null after deletion
      console.log('UserToken deleted successfully.');
    } catch (error) {
      console.error('Error deleting userToken:', error);
    }
  };
  // deleteUserToken();  
  //END WARNING

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContext.Provider value={{ userToken, setUserToken, selectedBFam, setSelectedBFam, userID, setUserID }}>
        <NavigationContainer>
          {userToken !== null && userToken !== undefined && userToken !== '' ? (
            <Stack.Navigator>
              <Stack.Screen name="MainNavScreen" component={MainNavScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="LoginScreen" component={LoginScreen} 
                options={{ 
                  title: 'Log in',
                  headerTitleStyle: {
                    color: '#fff', 
                  },
                  headerStyle:{
                    backgroundColor:'#3867c7',
                  },
                  headerShown:false,
                }} 
                
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
        <StatusBar style='light'/>
      </AppContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:300,
    backgroundColor:'red',
    height:50,
  },
});
