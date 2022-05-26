export default {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_POSTS(state, data) {
    state.posts = data;
  },
  PUSH_MESSAGE(state, data) {
    state.posts = [data, ...state.posts];
  },
  SET_MESSAGE(state, data) {
    state.message = data;
  },
};
