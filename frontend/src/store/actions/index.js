import { apiRequest } from './api';
export default {
  fetchUser({ commit }, user) {
    commit('SET_USER', user);
  },
  async fetchPosts({ commit }) {
    // make get request with bearer token authentication
    const { data } = await apiRequest('GET', '/posts');
    commit('SET_POSTS', data);
  },
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  async postMessage({ commit }, message) {
    const { data } = await apiRequest('POST', '/posts', { message });
    commit('PUSH_MESSAGE', data);
  },
};
