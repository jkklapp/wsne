import axios from 'axios';
import { getAuth } from '../../auth';

export const unAuthApiRequest = async (method, url, data) => {
  return await axios({
    method,
    url,
    data,
    headers: {
      ContentType: 'application/json',
    },
  });
};

export const apiRequest = async (method, endpoint, params, data) => {
  const idToken = await getAuth().currentUser.getIdToken(true);
  return await axios({
    method,
    url: process.env.VUE_APP_API_BASE + endpoint,
    params,
    data,
    headers: {
      Authorization: `Bearer ${idToken}`,
      ContentType: 'application/json',
    },
  });
};
