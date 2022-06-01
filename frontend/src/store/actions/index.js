import { apiRequest } from './api';
export default {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  async fetchPosts({ commit }, { startAfter, limit }) {
    // make get request with bearer token authentication
    const { data } = await apiRequest('GET', '/posts', {
      startAfter,
      limit,
    });
    commit('SET_POSTS', data.results);
    commit('SET_START_AFTER', data.startAfter);
  },
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  async postMessage({ commit }, message) {
    const { data } = await apiRequest('POST', '/posts', null, { message });
    commit('PUSH_MESSAGE', data);
  },
};
