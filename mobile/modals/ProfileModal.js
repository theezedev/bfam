import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Platform, PanResponder, Image, FlatList, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import fetchUserInfo from '../functions/fetchUserInfo';
import AppContext from '../AppContext';
import globals from '../globals';

const ProfileModal = ({ visible, onClose, onCreateFam }) => {
  const [famName, setFamName] = useState('');
  const { userToken, setUserToken, } = useContext(AppContext);
  const [ userFname, setUserFName ] = useState('');
  const [ userLname, setUserLName ] = useState('');
  const [ userProfPic, setUserProfPic ] = useState(`${globals.profPicURL}nopic.jpg`);

  const [platforms, setPlatforms] = useState([]);

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (visible) {
        try {
          const userInfo = await fetchUserInfo(userToken);
          console.log(userInfo);
          setUserFName(userInfo[0].userFirstName);
          setUserLName(userInfo[0].userLastName);
          setPlatforms(userInfo[0].platforms || []);
          setUserProfPic(`${globals.profPicURL}${userInfo[0].userID}.jpg`);
          
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };
  
    fetchData(); // Invoke the async function immediately
  
  }, [visible, userToken]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        // Check if swipe down by checking the gesture state
        if (gestureState.dy > 50) {
          onClose(); // Close the modal if swiped down
        }
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => {
        return false;
      },
    })
  ).current;

  const renderPlatformItem = ({ item }) => {

    let iconName = 'help-circle'; 
    let iconColor = 'black';
    switch (item.platformName.toLowerCase()) {
      case 'whatsapp':
        iconName = 'whatsapp';
        iconColor = 'green';
        break;
      case 'facebook':
        iconName = 'facebook';
        iconColor = 'blue';
        break;
      case 'instagram':
        iconName = 'instagram';
        iconColor = 'purple';
        break;
      // Add more cases based on your platform types and corresponding icons
      default:
        // Set a default icon in case the platform type doesn't match any case
        iconName = 'help-circle';
        break;  
    }

    const rightSwipeActions = (progress, dragX) => {

    const onDelete = () => {
      const updatedPlatforms = platforms.filter((platform) => platform.platformID !== item.platformID);
      setPlatforms(updatedPlatforms);
    };

    return (
      <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={onDelete} style={{borderRadius:5, backgroundColor:'red', padding:6,}}>
          <Text style={{color:'#fff'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        {/* Adjust the rendering of each platform item based on your requirements */}
        <Icon name={iconName} color={iconColor} size={30} style={{ marginRight: 5 }} />
        <Text style={{}}>{item.platformName}</Text>
        {/* Add other platform details as needed */}
      </TouchableOpacity>
    </Swipeable>
  );

    // return (
    //   <TouchableOpacity style={{ flex:1, flexDirection:'row', alignItems:'center', margin:10}} onPress={() => Linking.openURL(item.platformValue)}>
    //     {/* Adjust the rendering of each platform item based on your requirements */}
    //     <Icon name={iconName} color={iconColor} size={30} style={{marginRight:5,}}/>
    //     <Text style={{}}>{item.platformName}</Text>
    //     {/* Add other platform details as needed */}
    //   </TouchableOpacity>
    // );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <SafeAreaView style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer} {...panResponder.panHandlers}>
              <View style={{}}>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText}>My Profile</Text>
                </View>
              </View>
              <View style={{flex:1}}>
                <View style={{ flex: 1, justifyContent: 'flex-start', padding:20, }}>
                  <View style={{alignItems:'center',}}>
                      <TouchableOpacity>
                          <Image source={{ uri: userProfPic }} style={styles.profileImage} />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.inputSection}>
                      <Text style={styles.inputLabel}>Name:</Text>
                      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                          <TextInput
                              style={[styles.input,{flex:1, marginRight:5,}]}
                              value={userFname}
                              onChangeText={setUserFName}
                              placeholder="First"
                          />
                          <TextInput
                              style={[styles.input,{flex:1, marginLeft:5,}]}
                              value={userLname}
                              onChangeText={setUserLName}
                              placeholder="Surname"
                          />
                      </View>
                  </View>
                  <View style={{flex:1, marginTop:5,}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                      <Text style={styles.inputLabel}>Platforms:</Text>
                      <TouchableOpacity style={{backgroundColor:'#3867c7', padding:6, borderRadius:5,}}>
                        <Text style={{color:'#fff'}}>New</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                      <FlatList
                          data={platforms}
                          keyExtractor={(item) => item.platformID}
                          renderItem={renderPlatformItem}
                          ListEmptyComponent={() => (
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>No platforms available</Text>
                          )}
                        />
                    </View>
                  </View>
                </View>
                <View style={{ flex:0, marginBottom:'10%', padding:20, }}>
                  <TouchableOpacity style={styles.joinButton} onPress={{}}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    // padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
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
  modalTitle:{
    backgroundColor:'#3867c7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height:50,
    alignItems:'center',
    justifyContent:'center',
  },
  modalTitleText:{
    color:'#fff',
    textAlign:'center',
    fontSize:20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  inputSection:{
    marginBottom:10,
  },
  inputLabel:{
    fontWeight:'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  joinButton: {
    backgroundColor: '#3867c7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
  },
});

export default ProfileModal;
