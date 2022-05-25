import { createStore } from 'vuex';
import axios from 'axios';
const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    posts: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    getPosts(state) {
      return state.posts;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_POSTS(state, data) {
      state.posts = data;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        commit('SET_USER', user);
      } else {
        commit('SET_USER', null);
      }
    },
    async fetchPosts({ commit }) {
      try {
        console.log(process.env);
        const data = await axios.get(`${process.env.VUE_APP_API_BASE}/posts`);
        commit('SET_POSTS', data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default store;
