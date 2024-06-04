import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Platform, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globals from '../globals';
import AppContext from '../AppContext';

const CreateFamModal = ({ visible, onClose, onCreateFam }) => {
  const [famName, setFamName] = useState('');
  const { userID, setUserID, } = useContext(AppContext);

  const closeModal = () => {
    onClose();
  };

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

  const postNewBFam = async () => {

    if (!famName || famName.trim().length === 0) {
      alert('Family name cannot be blank!');
      return;
    }

    try {
      const data = {
        userID: userID,
        bfamName: famName,
        isDefault: 1,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
          // Add other necessary headers like authorization if needed
        },
        body: JSON.stringify(data), // Convert JavaScript object to JSON string
      };
  
      const response = await fetch(`${globals.apiURL}postNewBFam`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json(); // Parse the response data
      console.log(responseData); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
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
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleText}>CREATE A FAMILY</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', padding:20, }}>
                <Text>Enter your family name:</Text>
                <TextInput
                  style={styles.input}
                  value={famName}
                  onChangeText={setFamName}
                  placeholder="Your family's name..."
                />
              </View>
              <View style={{ marginBottom: '10%', padding:20, }}>
                <TouchableOpacity style={styles.joinButton} onPress={postNewBFam}>
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
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

export default CreateFamModal;
