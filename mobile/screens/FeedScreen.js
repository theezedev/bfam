import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import AppContext from '../AppContext';
import NewPostOrEventModal from '../modals/NewPostOrEventModal';
import globals from '../globals';

const FeedScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Posts');
  const [feedData, setFeedData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const { selectedBFam, setSelectedBFam } = useContext(AppContext);


  const fetchData = async (filterBy) => {
    try {
      setRefreshing(true);
     
      setSelectedFilter(filterBy);
      //928983ca-9826-11ee-8792-05ea8af323d6
      const response = await fetch(`${globals.apiUrl}getFeed?bfam=${selectedBFam}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
    
      switch (filterBy) {
        case 'Posts':
          const posts = jsonData.Posts;
          setFeedData(posts);
          break;
        case 'Events':
          const events = jsonData.Events; 
          setFeedData(events); 
          break;
        default:
            
          break;
      }

      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    if (selectedBFam) {
      fetchData('Posts');
    }
  }, [selectedBFam]);

  const handleRefresh = () => {
    fetchData(selectedFilter);
  };

  const handleCloseModal = () => {
    setSelectedModal(null);
  };

  const handleOpenModal = (modalType) => {
    setSelectedModal(modalType);
  };

  const filterData = (filterBy) => {
    fetchData(filterBy);
  };

  const formatDate = (sDate) => {
    let tempDate = moment(sDate);

    return tempDate.format('MMM Do');
  };

  const renderFeedItem = ({ item }) => {
    const timeAgo = getTimeDifference(item.postCreated || item.eventCreated); 
    const itemID = item.postID || item.eventID;
    const profPicURL = `${globals.profPicURL}${item.userID}.jpg`;
    const eventSDate = formatDate(item.eventSDate);

    return (
      <TouchableOpacity style={styles.feedItem} key={itemID} onPress={() => navigation.navigate('Details', { postId: item.bfamID })}>
        {item.postType === 'Post' ? (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              <Image source={{ uri: profPicURL }} defaultSource={{ uri: `${globals.profPicURL}nopic.jpg` }} style={styles.postImage} />
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', color: '#313131' }}>{item.userFullName} says:</Text>
                <Text style={{ fontSize: 10, color: '#313131' }}>{timeAgo}</Text>
              </View>
              <View style={{ flex: 1}}>
                <Text numberOfLines={3} ellipsizeMode="tail">{item.postContent}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Icon name={item.eventIcon} size={80} color={item.eventIconColor} style={[styles.postImage,{ alignSelf: 'center' }]}/>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>{item.eventTitle}</Text>
                <Text style={{ fontSize: 10 }}>{timeAgo}</Text>
              </View>
              <View style={{ flex: 1}}>
                <Text numberOfLines={3} ellipsizeMode="tail">{item.eventContent}</Text>
              </View>
              <View style={{marginTop:5}}>
                <Text style={{fontWeight:'bold'}}>{eventSDate}</Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text>No data available</Text>
      </View>
    );
  };

  const getTimeDifference = (mysqlDatetime) => {
    const mysqlTime = new Date(mysqlDatetime).getTime(); // Convert MySQL datetime to milliseconds
    const currentTime = new Date().getTime(); // Get current time in milliseconds
  
    const timeDifference = currentTime - mysqlTime; // Calculate the time difference in milliseconds
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <View style={styles.container}>
        <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={{alignItems:'flex-start'}}> 
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'Posts' && styles.activeFilter]}
              onPress={() => filterData('Posts')}
            >
              <Text style={[styles.filterText, selectedFilter === 'Posts' && styles.activeFilterText]}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'Events' && styles.activeFilter]}
              onPress={() => filterData('Events')}
            >
              <Text style={[styles.filterText, selectedFilter === 'Events' && styles.activeFilterText]}>Events</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={[{alignItems:'center', justifyContent:'center'}, styles.filterContainer]}>
            <TouchableOpacity style={styles.postButton} onPress={() => handleOpenModal('NewPostOrEventModal')}>
              <Text style={{color:'#fff'}}>NEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      <FlatList
        data={feedData}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.postID || item.eventID}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        extraData={selectedFilter}
        style={{ flex: 1, marginTop:10, }}
        ListEmptyComponent={renderEmptyComponent()}
      />

      <NewPostOrEventModal
        visible={selectedModal === 'NewPostOrEventModal'}
        onClose={handleCloseModal}
        navigation={navigation}
        onCreateFam={(famName) => {
          handleCloseModal();
        }}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: 'gray',
    borderColor:'#3867c7',
    marginRight: 10,
    alignSelf: 'flex-start', 
  },
  activeFilter: {
    backgroundColor: '#3867c7',
  },
  filterText: {
    fontSize: 16,
    color: '#313131'
  },
  activeFilterText: {
    fontSize: 16,
    color: '#fff'
  },
  feedItem: {
    padding: 10,
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
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
  postImage: {
    width: 80,
    height: 80,
    marginRight:10,
  },
  postButton:{
    borderRadius:5,
    backgroundColor:'#3867c7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 5,
  },
});

export default FeedScreen;
