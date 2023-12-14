import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';

import AppContext from '../AppContext';


const Stack = createStackNavigator();

const LoginScreen = () => {
  const { userToken, setUserToken } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#3867c7',}}>
      <View style={{}}>
        {/* <Text>bFam</Text>*/}
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
                console.log("User Token: " + userToken);
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
      <StatusBar style='dark' />
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
  });

export default LoginScreen;
