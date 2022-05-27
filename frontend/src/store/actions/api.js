import firebase from 'firebase/compat/app';
import axios from 'axios';

export const apiRequest = async (method, url, data) => {
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  return await axios({
    method,
    url: process.env.VUE_APP_API_BASE + url,
    data,
    headers: {
      Authorization: `Bearer ${idToken}`,
      ContentType: 'application/json',
    },
  });
};
