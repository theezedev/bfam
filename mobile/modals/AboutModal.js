import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Platform, PanResponder, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutModal = ({ visible, onClose, onCreateFam }) => {
  // const [famName, setFamName] = useState('');

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

  const externalSources = [
    { id: 1, name: 'Illustration by Julia G', url: 'https://icons8.com/illustrations/author/627444'},
    // { id: 2, name: 'Source 2', url: 'https://www.source2.com' },
    // { id: 3, name: 'Source 3', url: 'https://www.source3.com' },
    // Add more sources as needed
  ];

  const renderExternalSource = ({ item }) => {
    const handlePress = () => {
      // Open the URL in the device's default browser
      Linking.openURL(item.url);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={{ padding: 10 }}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
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
                <Text style={styles.modalTitleText}>About</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', padding:20, }}>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Info:</Text>
                    
                </View>
                <View>
                  <Text style={styles.inputLabel}>Attribution:</Text>
                  <FlatList
                    data={externalSources}
                    renderItem={renderExternalSource}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              </View>
              <View style={{ marginBottom: '10%', padding:20, }}>
                
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

export default AboutModal;
