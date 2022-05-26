import { createStore } from 'vuex';
import axios from 'axios';
import firebase from 'firebase/compat/app';

const store = createStore({
  state: {
    user: null,
    posts: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.user !== null;
    },
    getPosts(state) {
      return state.posts;
    },
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    SET_POSTS(state, data) {
      state.posts = data;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      console.log('fetchUser');
      commit('SET_USER', user);
    },
    async fetchPosts({ commit }) {
      // make get request with bearer token authentication
      console.log(process.env);
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
          console.log(response);
          commit('SET_POSTS', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
export default store;
