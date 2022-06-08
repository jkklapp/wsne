import { apiRequest, unAuthApiRequest } from './api';

export default {
  setUser({ commit }, user) {
    commit('SET_USER', user);
    commit('SET_LOGGED_IN', user.email && user.displayName);
  },
  async fetchPosts({ commit }, { startAfter, limit, parentId }) {
    commit('IS_LOADING_POSTS', true);
    const { data } = await apiRequest('GET', '/posts', {
      startAfter,
      limit,
      parentId,
    });
    const { results, nextPageToken, remainingMessages } = data;
    commit('SET_POSTS', { results, parentId });
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
    commit('SET_LIKING_POST', post.id);
    commit('SET_POST_BY_ID', {
      ...post,
      likes: like ? post.likes + 1 : post.likes - 1,
      likedByMe: like,
    });
    try {
      await apiRequest('PUT', `/posts/${post.id}`, null, {
        like,
      });
    } catch ({ response }) {
      commit('SET_POST_BY_ID', post);
      throw response.data;
    }
    commit('SET_LIKING_POST', null);
  },
  async checkExists({ commit }, payload) {
    if (payload.email) {
      commit('SET_IS_CHECKING_EMAIL', true);
    }
    if (payload.name) {
      commit('SET_IS_CHECKING_NAME', true);
    }
    const { data } = await unAuthApiRequest('POST', `/users/exists`, payload);
    if (payload.email) {
      commit('SET_USER_EMAIL_EXISTS', data.exists);
      commit('SET_IS_CHECKING_EMAIL', false);
    }
    if (payload.name) {
      commit('SET_USER_NAME_EXISTS', data.exists);
      commit('SET_IS_CHECKING_NAME', false);
    }
  },
};
