import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Platform, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPostOrEventModal = ({ visible, onClose, navigation }) => {

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
                <Text style={styles.modalTitleText}>NEW</Text>
              </View>
              <View style={{ flex: 1, flexDirection:'column', justifyContent: 'space-evenly', alignItems:'center', padding:20,}}>
                <TouchableOpacity onPress={() => {navigation.navigate('New Post'); closeModal();}} style={styles.newButton}>
                  <Text style={{color:'#fff'}}>New Post</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.navigate('New Post'); closeModal();}} style={styles.newButton}>
                  <Text style={{color:'#fff'}}>New Event</Text>
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
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  newButton: {
    backgroundColor: '#3867c7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    height: '20%',
    width: '80%',
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

export default NewPostOrEventModal;
