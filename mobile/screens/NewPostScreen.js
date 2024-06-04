import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewPostScreen = () => {
  const [postText, setPostText] = useState('');

  const handleSavePost = () => {
    // Implement your logic to save the post
    console.log('Saving post:', postText);
    // Clear the text input after saving
    setPostText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Write your post here..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={{color:'#fff'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor:'#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'#fff',
  },
  saveButton:{
    backgroundColor: '#3867c7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewPostScreen;
