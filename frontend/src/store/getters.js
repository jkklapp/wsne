export default {
  user(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.user !== null;
  },
  getPosts(state) {
    return state.posts;
  },
  userInitial(state) {
    return state.user.displayName[0].toUpperCase();
  },
};
