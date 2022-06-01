import { apiRequest } from './api';
export default {
  setUser({ commit }, user) {
    commit('SET_USER', user);
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
    commit('IS_LOADING_POSTS', true);
    const { data } = await apiRequest('POST', '/posts', null, { message });
    commit('PUSH_MESSAGE', data);
    commit('IS_LOADING_POSTS', false);
  },
};
