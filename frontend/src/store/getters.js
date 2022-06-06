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
  shouldRenderBackToTopButton(state) {
    return state.startAfter == -1;
  },
  shouldRenderLoadMoreButton(state) {
    return state.startAfter > 0;
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
};
