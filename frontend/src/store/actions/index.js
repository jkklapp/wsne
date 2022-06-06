import { apiRequest } from './api';

export default {
  setUser({ commit }, user) {
    commit('SET_USER', user);
    commit('SET_LOGGED_IN', user.email && user.displayName);
  },
  async fetchPosts({ commit }, { startAfter, limit }) {
    // make get request with bearer token authentication
    commit('IS_LOADING_POSTS', true);
    const { data } = await apiRequest('GET', '/posts', {
      startAfter,
      limit,
    });
    const { results, nextPageToken, remainingMessages } = data;
    commit('SET_POSTS', results);
    commit('SET_START_AFTER', nextPageToken);
    commit('SET_REMAINING_MESSAGES', remainingMessages || 0);
    commit('IS_LOADING_POSTS', false);
  },
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  resetPostsPagination({ commit }) {
    commit('SET_START_AFTER', null);
  },
  async postMessage({ commit, state }, message) {
    commit('IS_CREATING_POST', true);
    commit('PUSH_MESSAGE', {
      message,
      date: new Date().getTime(),
    });
    try {
      const { data } = await apiRequest('POST', '/posts', null, { message });
      commit('POP_MESSAGE');
      commit('PUSH_MESSAGE', data);
      commit('SET_REMAINING_MESSAGES', state.remainingMessages - 1);
    } catch ({ response }) {
      commit('POP_MESSAGE');
      throw response.data;
    }
    commit('IS_CREATING_POST', false);
  },
  async toggleLike({ commit }, { post, like }) {
    try {
      await apiRequest('PUT', `/posts/${post.id}`, null, {
        like,
      });
      commit('SET_POST_BY_ID', {
        ...post,
        likes: like ? post.likes + 1 : post.likes - 1,
        likedByMe: like,
      });
    } catch ({ response }) {
      throw response.data;
    }
  },
};
