import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import globals from '../globals';

const FamDetailsScreen = ({ route }) => {
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const memberId = route.params.memberId; // Get memberId from navigation params
        const info = await fetchMemberInfo(memberId); // Fetch member info based on memberId
        setMemberInfo(info);
        // setPlatforms(info[0].platforms)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member info:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [route.params.memberId]);

  const fetchMemberInfo = async (memberID) => {
    try {
        setLoading(true);
        const response = await fetch(`${globals.apiUrl}getMemberInfo?user=${memberID}`);
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const temp = await response.json();
        // console.log(temp[0].platforms);
        // setMemberInfo(temp);
        // setLoading(false);
        return temp;

    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3867c7" />
      </View>
    );
  }

  const renderPlatformItem = ({ item }) => {
    console.log(item);
    let iconName = 'help-circle'; 
    let iconColor = 'black';
    switch (item.platformName.toLowerCase()) {
      case 'whatsapp':
        iconName = 'whatsapp';
        iconColor = 'green';
        break;
      case 'facebook':
        iconName = 'facebook';
        iconColor = 'blue';
        break;
      case 'instagram':
        iconName = 'instagram';
        iconColor = 'purple';
        break;
      // Add more cases based on your platform types and corresponding icons
      default:
        // Set a default icon in case the platform type doesn't match any case
        iconName = 'help-circle';
        break;  
    }

    return (
      <TouchableOpacity style={{ flex:1, flexDirection:'row', alignItems:'center', margin:10}} onPress={() => Linking.openURL(item.platformValue)}>
        <Icon name={iconName} color={iconColor} size={30} style={{marginRight:5,}}/>
        <Text style={{}}>{item.platformName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff', padding:20 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor:'transparent', width:'100%',}}>
            <View style={[{alignItems:'center',}, styles.section]}>
                <TouchableOpacity>
                    <Image source={{ uri: globals.profPicURL+memberInfo[0].userID+'.jpg' }} style={styles.profileImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Name:</Text>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Text style={styles.labelValue}>{memberInfo[0].userFirstName}</Text>
                    
                    <Text style={styles.labelValue}>{memberInfo[0].userLastName}</Text>
                </View>
            </View>
            <View style={[{flex:1, marginTop:5,}, styles.section]}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.label}>Platforms:</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <FlatList
                        data={platforms}
                        keyExtractor={(item) => item.platformID}
                        renderItem={renderPlatformItem}
                        ListEmptyComponent={() => (
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>No platforms available</Text>
                        )}
                    />
                </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 40,
      marginBottom: 5,
    },
    section:{
        marginBottom:15,
    },
    labelValue:{
        fontSize:20,
    },
    label:{
        fontWeight:'bold',
    },
  });

export default FamDetailsScreen;
