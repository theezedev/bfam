import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FamScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'John Doe', title: 'Parent', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Doe', title: 'Child', imageUrl: 'https://via.placeholder.com/150' },
    // Add more family members as needed
  ]);

  const filteredMembers = familyMembers.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMember = ({ item }) => (
    <TouchableOpacity style={styles.memberContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    // Simulate fetching updated data from an API or source
    setRefreshing(true);
    // Example: Fetch updated data (replace with your data fetching logic)
    setTimeout(() => {
      // Example: Replace the existing data with updated data
      setFamilyMembers([
        { id: 1, name: 'John Doe', title: 'Parent', imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Jane Doe', title: 'Child', imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Alice Smith', title: 'Grandparent', imageUrl: 'https://via.placeholder.com/150' },
        // Add more updated family members or replace with new data
      ]);
      setRefreshing(false);
    }, 1500); // Simulate a delay for fetching data (you can adjust the delay time)
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
            keyExtractor={item => item.id.toString()}
            numColumns={2} // You can adjust the number of columns as needed
            contentContainerStyle={styles.listContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
  },
  searchInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  memberContainer: {
    flex:2,
    aspectRatio: 1, // Aspect ratio for square shape
    backgroundColor: '#E0E0E0', // Placeholder background color
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
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
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FamScreen;
