import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const FeedScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('Posts');
  const [feedData, setFeedData] = useState([]); // Placeholder for feed data
  const [refreshing, setRefreshing] = useState(false);

  // Simulated data for posts and events (replace with your actual data)
  const postsData = [
    { id: 1, type: 'Post', content: 'This is a post.' },
    { id: 2, type: 'Post', content: 'Another post here.' },
    // Add more posts as needed
  ];

  const eventsData = [
    { id: 1, type: 'Event', content: 'Event happening soon.' },
    { id: 2, type: 'Event', content: 'Upcoming event.' },
    // Add more events as needed
  ];

  useEffect(() => {
    // Load initial feed data (simulated with posts by default)
    setFeedData(postsData);
  }, []);

  const handleRefresh = () => {
    // Simulate refreshing data (replace with your actual data fetching logic)
    setRefreshing(true);
    setTimeout(() => {
      if (selectedFilter === 'Posts') {
        setFeedData(postsData); // Refresh with posts
      } else {
        setFeedData(eventsData); // Refresh with events
      }
      setRefreshing(false);
    }, 1500); // Simulated delay
  };

  const renderFeedItem = ({ item }) => (
    <TouchableOpacity style={styles.feedItem}>
      <Text>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={{alignItems:'flex-start'}}> 
            <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Posts' && styles.activeFilter]}
            onPress={() => setSelectedFilter('Posts')}
            >
            <Text style={styles.filterText}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Events' && styles.activeFilter]}
            onPress={() => setSelectedFilter('Events')}
            >
            <Text style={styles.filterText}>Events</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
      
      <FlatList
        data={feedData}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={{ flex: 1 }}
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
    // alignItems: 'flex-start', // Ensures buttons take up height based on content
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    alignSelf: 'flex-start', // Aligns buttons based on their content height
  },
  activeFilter: {
    backgroundColor: 'lightblue',
  },
  filterText: {
    fontSize: 16,
  },
  feedItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default FeedScreen;
