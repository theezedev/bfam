'use strict';
import { StyleSheet, Platform } from 'react-native';

module.exports = StyleSheet.create({
  mainContainer:{
    flex:1 ,
  },
  screenContainer:{
    flex:1 ,
    paddingHorizontal:'2%',
  },
  formControl: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  bgPrimary:{
    backgroundColor:'#47a81a',
    color:'#fff',
  },
  btnPrimary:{
      backgroundColor:'#47a81a',
      color:'#fff',
      padding:10,
      justifyContent:'center',
      alignItems:'center',
      ...Platform.select({
          ios: {
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
              width: 0,
              height: -3,
            },
            borderRadius: '5%',
          },
          android: {
            borderRadius: 10,
            elevation: 10,
          },
        }),

  },
  txtPrimary:{
    color:'#3867c7',
  },
  txtWhite:{
      color:'#fff',
  },
  backgroundImage:{
      flex: 1,
      justifyContent: 'center',
  },
  gloShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  selectedButton:{
      backgroundColor:'#43464b',
  },

});
