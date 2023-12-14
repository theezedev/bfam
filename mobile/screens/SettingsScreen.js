import * as SecureStore from 'expo-secure-store';

import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

import AppContext from '../AppContext';
import JoinFamModal from '../modals/JoinFamModal';
import CreateFamModal from '../modals/CreateFamModal';
import ProfileModal from '../modals/ProfileModal';

const gloStyles = require('../gloStyles'); //Global Styles

// List of options for the settings
const settingsOptions = [
  { id: '1', title: 'My Profile', showModal: 'ProfileModal' },
  { id: '2', title: 'Join Fam', showModal: 'JoinFamModal' },
  { id: '3', title: 'Create Fam', showModal: 'CreateFamModal' },
  { id: '4', title: 'My Fams', showModal: 'MyFamsModal' },

  // { id: '5', title: 'Join Fam', showModal: 'JoinFamModal' },e
  // { id: '6', title: 'Create Fam', showModal: 'CreateFamModal' },
  // { id: '6', title: 'My Fams', showModal: 'MyFamsModal' },
  // { id: '7', title: 'Join Fam', showModal: 'JoinFamModal' },
  // { id: '8', title: 'Create Fam', showModal: 'CreateFamModal' },
  // { id: '9', title: 'My Fams', showModal: 'MyFamsModal' },
  // { id: '10', title: 'Join Fam', showModal: 'JoinFamModal' },
  // { id: '11', title: 'Create Fam', showModal: 'CreateFamModal' },
  // { id: '12', title: 'My Fams', showModal: 'MyFamsModal' },
];

const SettingsScreen = () => {
  const [selectedModal, setSelectedModal] = useState(null);
  const { userToken, setUserToken } = useContext(AppContext);


  const handleCloseModal = () => {
    setSelectedModal(null);
  };

  const handleOpenModal = (modalType) => {
    setSelectedModal(modalType);
  };

  const handleSignOut = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setUserToken(null); // Set userToken in context to null after deletion
      console.log('UserToken deleted successfully.');
    } catch (error) {
      console.error('Error deleting userToken:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={settingsOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.settingButton, gloStyles.gloShadow]}
            onPress={() => handleOpenModal(item.showModal)}
          >
            <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[gloStyles.txtPrimary, {fontWeight:'bold',}]}>{item.title}</Text>
              <Icon name={'chevron-thin-right'} size={20} color={'#3867c7'} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: '5%', paddingBottom:'5%', }}
      />
      <View style={{ paddingHorizontal: '5%' }}>
        <TouchableOpacity
          style={[gloStyles.gloShadow, {backgroundColor:'#3867c7',borderRadius: 10, marginHorizontal:8}]}
          onPress={() => handleSignOut()}
        >
          <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[gloStyles.txtWhite, {fontWeight:'bold',}]}>Sign out</Text>
            <Icon name={'chevron-thin-right'} size={20} color={'#fff'} />
          </View>
        </TouchableOpacity>
      </View>

      <JoinFamModal
        visible={selectedModal === 'JoinFamModal'}
        onClose={handleCloseModal}
        onJoinFam={(code) => {
          console.log('Joining with code:', code);
          handleCloseModal();
        }}
      />
      <CreateFamModal
        visible={selectedModal === 'CreateFamModal'}
        onClose={handleCloseModal}
        onCreateFam={(famName) => {
          console.log('Family name:', famName);
          handleCloseModal();
        }}
      />
      <ProfileModal
        visible={selectedModal === 'ProfileModal'}
        onClose={handleCloseModal}
        onCreateFam={(famName) => {
          console.log('Family name:', famName);
          handleCloseModal();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingButton:{
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    margin: 8,
    borderWidth:1,
    borderColor:'#3867c7'
  },

});


export default SettingsScreen;
