import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Platform, PanResponder, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileModal = ({ visible, onClose, onCreateFam }) => {
  const [famName, setFamName] = useState('');
  // const [code, setCode] = useState('');

  const handleJoin = () => {
    if (code.length === 36) {
      onCreateFam(code);
      onClose(); // Close the modal
    } else {
      //not 36 characters.
      alert("That code doesn't seem correct. Can you try again?");
    }
  };

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
                <Text style={styles.modalTitleText}>My Profile</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', padding:20, }}>
                <View style={{alignItems:'center',}}>
                    <TouchableOpacity>
                        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Name:</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <TextInput
                            style={[styles.input,{flex:1, marginRight:5,}]}
                            value={famName}
                            onChangeText={setFamName}
                            placeholder="First"
                        />
                        <TextInput
                            style={[styles.input,{flex:1, marginLeft:5,}]}
                            value={famName}
                            onChangeText={setFamName}
                            placeholder="Surname"
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Socials/Contact:</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        
                    </View>
                </View>
              </View>
              <View style={{ marginBottom: '10%', padding:20, }}>
                <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                  <Text style={styles.buttonText}>Save</Text>
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
    height: '70%',
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
