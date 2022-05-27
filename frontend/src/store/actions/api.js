import axios from 'axios';
import { getAuth } from '../../auth';

export const apiRequest = async (method, url, data) => {
  const idToken = await getAuth().currentUser.getIdToken(true);
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
