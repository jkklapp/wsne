import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';

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
  mutations,
  actions,
});
export default store;
