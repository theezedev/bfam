import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity, StyleSheet, RefreshControl, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


import globals from '../globals';
import AppContext from '../AppContext';

const FamScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const { selectedBFam, setSelectedBFam } = useContext(AppContext);
  const { userID, setUserID } = useContext(AppContext);

  const fetchBFamMembers = async () => {
    try {
      // Make API call to fetch family members data
      const response = await fetch(`${globals.apiUrl}getBFamMembers?bfam=${selectedBFam}`);
      const data = await response.json();
      // Update familyMembers state with the fetched data
      setFamilyMembers(data);
    } catch (error) {
      console.error('Error fetching family members:', error);
    }
  };

  useEffect(() => {
    fetchBFamMembers(); 
  }, []);

  const filteredMembers = familyMembers.filter(
    member =>
      member.userFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.userLastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMember = ({ item }) => {
    // Check if the userID matches item.userID, and return null if they match
    if (userID === item.userID) {
      return null;
    }
  
    return (
      <TouchableOpacity style={styles.memberContainer} onPress={() => navigation.navigate('FamDetails', { memberId: item.userID })}>
        <Image source={{ uri: `${globals.profPicURL}${item.userID}.jpg` }} style={styles.profileImage} />
        <Text style={styles.name}>{`${item.userFirstName} ${item.userLastName}`}</Text>
        <Text style={styles.title}>{item.bfamMemberRole}</Text>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBFamMembers();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <Icon name={'search-outline'} size={20} color={'#CCCCCC'} style={{marginLeft:10,}}/>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
        </View>
        <FlatList
          data={filteredMembers}
          renderItem={renderMember}
          keyExtractor={item => item.bfamMemberID}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection:'row',
    borderWidth:1,
    borderColor: '#CCCCCC',
    height: 40,
    borderRadius: 5,
    alignItems:'center',
    marginBottom:10,
    backgroundColor:'#fff'
  },
  searchInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    flex:1,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  memberContainer: {
    flex:2,
    aspectRatio: 1, // Aspect ratio for square shape
    backgroundColor: '#fff', // Placeholder background color
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#313131',
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FamScreen;
