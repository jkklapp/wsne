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
    const { results, nextPageToken } = data;
    commit('SET_POSTS', results);
    commit('SET_START_AFTER', nextPageToken);
    commit('IS_LOADING_POSTS', false);
  },
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  resetPostsPagination({ commit }) {
    commit('SET_START_AFTER', null);
  },
  async postMessage({ commit }, message) {
    commit('IS_CREATING_POST', true);
    commit('PUSH_MESSAGE', {
      message,
      date: new Date().getTime(),
    });
    try {
      const { data } = await apiRequest('POST', '/posts', null, { message });
      commit('POP_MESSAGE');
      commit('PUSH_MESSAGE', data);
    } catch ({ response }) {
      commit('POP_MESSAGE');
      throw response.data;
    }
    commit('IS_CREATING_POST', false);
  },
};
