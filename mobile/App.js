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

import AppContext from './AppContext';
import MainNavScreen from './screens/MainNavScreen';
import LoginScreen from './screens/LoginScreen';

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

//Use custom font later.
// Text.defaultProps = {
//   style: {
//     fontFamily: 'Arial Rounded MT Bold',
//   },
// };

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


  const getUserData = () => {
    setTimeout(() => {
      // Simulating data retrieval after a delay of 2 seconds
      setIsLoading(false); // Set isLoading to false after data retrieval
    }, 2000); // Simulate a 2-second delay
  };

  const getUserToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        console.log('Retrieved userToken:', token);
        setUserToken(token);
        getUserData();
      } else {
        console.warn('Token not found.');
        // setIsLoading(false);
      }
    } catch (error) {
      console.error('Unknown error while getting userToken:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserToken().then((token) => {
      if (token !== null) {
        // If token exists, fetch user data
        setIsLoading(true);
        getUserData();
      } else {
        // If token doesn't exist, set isLoading to false and show login screen
        setIsLoading(false);
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
    <AppContext.Provider value={{ userToken, setUserToken }}>
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
      <StatusBar style='auto'/>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:300,
    backgroundColor:'red',
    height:50,
  },
});
