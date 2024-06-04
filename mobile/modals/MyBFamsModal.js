import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  PanResponder,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globals from '../globals';
import AppContext from '../AppContext';

const MyBFamsModal = ({ visible, onClose, onCreateFam }) => {
  const [bfamList, setBfamList] = useState([]);
  const { selectedBFam, setSelectedBFam } = useContext(AppContext);

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    if (visible) {
      fetchBFams(); // Fetch data when modal becomes visible
    }
  }, [visible]);

  const fetchBFams = async () => {
    try {
      const response = await fetch(
        `${globals.apiUrl}getMyBFams?user=b547b99e-9822-11ee-8792-05ea8af323d6`
      );
      const data = await response.json();
      setBfamList(data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching bFams:', error);
    }
  };

  const renderBFamItem = ({ item }) => {
    const isSelected = item.bfamID === selectedBFam;
  
    return (
      <TouchableOpacity disabled={isSelected}
        onPress={() => {
          if (!isSelected) {
            setSelectedBFam(item.bfamID);
            closeModal();
          }
        }}
      >
        <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
          <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
            {item.bfamName}
          </Text>
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
            <View style={styles.modalContainer}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleText}>My bFams</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems:'center',}}>
                {/* <Text style={{marginVertical:20, fontWeight:'bold', fontSize:15, color:'#313131'}}>Select a bFam:</Text> */}
                <FlatList
                  data={bfamList}
                  keyExtractor={(item) => item.bfamID}
                  renderItem={renderBFamItem}
                  style={{width:'100%'}}
                />
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  itemText: {
    fontSize: 20,
    color: '#313131',
    textAlign:'center',
    margin:10,
  },
  selectedItem: {
    backgroundColor: '#3867c7',
    opacity: 0.6,
  },
  selectedItemText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyBFamsModal;
