import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';

import AppContext from '../AppContext';
import globals from '../globals';
import fetchUserInfo from '../functions/fetchUserInfo';

const LoginScreen = () => {
  const { userToken, setUserToken, selectedBFam, setSelectedBFam, userID, setUserID } = useContext(AppContext);

  // const fetchUserInfo = async (userID) => {
  //   try {
  //     userID = userID.replaceAll('"','');
  //     const response = await fetch(`${globals.apiUrl}getUserInfo?user=${userID}`);
  //     // const response = await fetch(`${globals.apiUrl}getFeed?bfam=928983ca-9826-11ee-8792-05ea8af323d6`);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const userInfo = await response.json();  
  //     await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));
      
  //     // console.log('User info stored in AsyncStorage:', userInfo);
  //     setSelectedBFam(userInfo[0].bfamID);
  //     console.log(selectedBFam);
  //     console.log('bfam: '+userInfo[0].bfamID);
  //     return userInfo;
  //   } catch (error) {
  //     console.error('Error fetching user info:', error);
  //     throw error;
  //   }
  // };


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#3867c7',}}>
        <View style={{}}>
            <Image source={require('../assets/icon.png')} style={{height:100,width:100, borderRadius:10,}} />
        </View>
        <View>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={5}
            style={{width:300, height:50,}}
            onPress={async () => {
              try {
                // console.log('attempting signin.')
                const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
            
                if (credential.email || credential.fullName) {
                  let x = JSON.stringify(credential.user);
                  console.log(x);
                  await SecureStore.setItemAsync('userToken', x);
                  setUserToken(x);
                  const userInfo = await fetchUserInfo(x);

                  setSelectedBFam(userInfo[0].bfamID);
                  setUserID(userInfo[0].userID);
                } else {
                  console.log('User declined to share email or full name');
                }
              } catch (error) {
                if (error.code === 'ERR_REQUEST_CANCELED') {
                  // handle that the user canceled the sign-in flow
                  console.warn("Request cancelled.")
                } else {
                  // handle other errors
                  console.error("Uknown error while logging in.");
                  console.error(error);
                }
              }
            }}
          />
        </View>
        <Image source={require('../assets/family.png')} style={styles.backgroundImage} />
    </SafeAreaView>
  );
};


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
    backgroundImage: {
      position:'relative',
      zIndex:-1000,
      // flex: 1,
      // resizeMode: 'cover', // or 'contain' as per your preference
      // justifyContent: 'center', // or 'flex-start', 'flex-end', 'space-around', etc.
      // zIndex:-1000,
    },
  });

export default LoginScreen;
