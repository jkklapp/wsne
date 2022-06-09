export default {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_LOGGED_IN(state, data) {
    state.loggedIn = data;
  },
  SET_PARENT_ID(state, data) {
    state.parentId = data;
  },
  SET_POSTS(state, results) {
    state.posts = results;
  },
  SET_POST_BY_ID(state, data) {
    const index = state.posts.findIndex((post) => post.id === data.id);
    state.posts.splice(index, 1, data);
  },
  SET_LIKING_POST(state, data) {
    state.likingPost = data;
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
  PUSH_COMMENT(state, data) {
    state.posts = [
      ...state.posts,
      { ...data, userName: state.user.displayName },
    ];
  },
  POP_MESSAGE(state) {
    state.posts = state.posts.slice(1);
  },
  POP_COMMENT(state) {
    // removes last comment from posts array
    state.posts = state.posts.slice(0, -1);
  },
  INCREMENT_COMMENTS_COUNT(state) {
    const index = state.posts.findIndex((post) => post.id === state.parentId);
    state.posts[index].comments++;
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
  SET_USER_EMAIL_EXISTS(state, data) {
    state.userEmailExists = data;
  },
  SET_USER_NAME_EXISTS(state, data) {
    state.userNameExists = data;
  },
  SET_IS_CHECKING_EMAIL(state, data) {
    state.isCheckingEmail = data;
  },
  SET_IS_CHECKING_NAME(state, data) {
    state.isCheckingName = data;
  },
};
