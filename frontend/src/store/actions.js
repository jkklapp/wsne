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
      .catch(function (error) {
        console.log(error);
      });
  },
};
