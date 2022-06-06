export default {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_LOGGED_IN(state, data) {
    state.loggedIn = data;
  },
  SET_POSTS(state, data) {
    state.posts = data;
  },
  SET_POST_BY_ID(state, data) {
    const index = state.posts.findIndex((post) => post.id === data.id);
    state.posts.splice(index, 1, data);
  },
  SET_START_AFTER(state, data) {
    state.startAfter = data;
  },
  SET_REMAINING_MESSAGES(state, data) {
    state.remainingMessages = data;
  },
  PUSH_MESSAGE(state, data) {
    state.posts = [
      { ...data, userName: state.user.displayName },
      ...state.posts,
    ];
  },
  POP_MESSAGE(state) {
    state.posts = state.posts.slice(1);
  },
  SET_MESSAGE(state, data) {
    state.message = data;
  },
  IS_LOADING_POSTS(state, data) {
    state.loadingPosts = data;
  },
  IS_CREATING_POST(state, data) {
    state.creatingPost = data;
  },
};
