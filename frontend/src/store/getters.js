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
  shouldRenderBackToTopButton(state) {
    return state.startAfter == -1;
  },
  shouldRenderLoadMoreButton(state) {
    return state.startAfter > 0;
  },
  isLoadingPosts(state) {
    return state.loadingPosts;
  },
};
