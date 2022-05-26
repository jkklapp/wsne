import axios from 'axios';
import firebase from 'firebase/compat/app';

export default {
  fetchUser({ commit }, user) {
    commit('SET_USER', user);
  },
  async fetchPosts({ commit }) {
    // make get request with bearer token authentication
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async (idToken) => {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE}/posts`,
          {
            headers: {
              ContentType: 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        commit('SET_POSTS', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  postMessage({ commit }, message) {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async (idToken) => {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE}/posts`,
          {
            message,
          },
          {
            headers: {
              ContentType: 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        commit('PUSH_MESSAGE', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
