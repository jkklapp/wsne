import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const store = createStore({
  state: {
    user: { displayName: '', email: '' },
    startAfter: null,
    limit: parseInt(process.env.VUE_APP_POSTS_PER_PAGE, 10),
    posts: [],
    message: null,
    loadingPosts: false,
    creatingPost: false,
    loggedIn: false,
    remainingMessages: 0,
    likingPost: null,
    userEmailExists: false,
    userNameExists: false,
    isCheckingEmail: false,
    isCheckingName: false,
    parentId: null,
  },
  getters,
  mutations,
  actions,
});
export default store;
