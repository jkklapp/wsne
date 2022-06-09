export default {
  user(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.loggedIn;
  },
  getPosts(state) {
    return state.posts;
  },
  isLoadingPosts(state) {
    return state.loadingPosts;
  },
  isCreatingPost(state) {
    return state.creatingPost;
  },
  getRemainingMessages(state) {
    return state.remainingMessages;
  },
  getLikingPost(state) {
    return state.likingPost;
  },
  getUserEmailExists(state) {
    return state.userEmailExists;
  },
  getUserNameExists(state) {
    return state.userNameExists;
  },
  getIsCheckingEmail(state) {
    return state.isCheckingEmail;
  },
  getIsCheckingName(state) {
    return state.isCheckingName;
  },
  getPostById(state, id) {
    return state.posts.find((post) => post.id === id);
  },
};
