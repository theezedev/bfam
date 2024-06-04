import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetailsScreen = ({ route }) => {
  const { postId } = route.params; // Get postId passed from the previous screen

  // Fetch the post details based on the postId (replace this with your logic)
  const postDetails = {
    id: postId,
    content: 'This is a detailed view of the post.',
    // Other details specific to the post
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Details</Text>
      <View style={styles.postDetails}>
        <Text>Post ID: {postDetails.id}</Text>
        <Text>Content: {postDetails.content}</Text>
        {/* Display other details of the post */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDetails: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 5,
  },
});

export default PostDetailsScreen;
