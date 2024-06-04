import { SecureStore } from 'expo-secure-store';
import globals from '../globals';
import AppContext from '../AppContext';

const fetchUserInfo = async (userID, setSelectedBFam) => {
  try {
    userID = userID.replaceAll('"', '');
    const response = await fetch(`${globals.apiUrl}getUserInfo?user=${userID}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userInfo = await response.json();
    // await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));

    // setSelectedBFam(userInfo[0].bfamID);
    // console.log('bfam: ' + userInfo[0].bfamID);
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export default fetchUserInfo;
