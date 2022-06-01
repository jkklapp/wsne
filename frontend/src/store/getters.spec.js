import getters from './getters';

describe('getters', () => {
  describe('user', () => {
    it('should return the user', () => {
      const state = {
        user: {
          uid: '123',
          displayName: 'John Doe',
        },
      };
      const result = getters.user(state);

      expect(result).toEqual(state.user);
    });
  });
  describe('isLoggedIn', () => {
    it('should return true if user is not null', () => {
      const state = {
        user: {
          uid: '123',
          displayName: 'John Doe',
        },
      };
      const result = getters.isLoggedIn(state);

      expect(result).toBe(true);
    });
    it('should return false if user is null', () => {
      const state = {
        user: null,
      };
      const result = getters.isLoggedIn(state);

      expect(result).toBe(false);
    });
  });
  describe('getPosts', () => {
    it('should return the posts', () => {
      const state = {
        posts: [
          {
            id: '1',
            message: 'Hello World',
          },
        ],
      };
      const result = getters.getPosts(state);

      expect(result).toEqual(state.posts);
    });
  });
  describe('shouldRenderBackToTopButton', () => {
    it('should return true if startAfter is -1', () => {
      const state = {
        startAfter: -1,
      };
      const result = getters.shouldRenderBackToTopButton(state);

      expect(result).toBe(true);
    });
    it('should return false if startAfter is not -1', () => {
      const state = {
        startAfter: 0,
      };
      const result = getters.shouldRenderBackToTopButton(state);

      expect(result).toBe(false);
    });
  });
  describe('shouldRenderLoadMoreButton', () => {
    it('should return true if startAfter is greater than 0', () => {
      const state = {
        startAfter: 1,
      };
      const result = getters.shouldRenderLoadMoreButton(state);

      expect(result).toBe(true);
    });
    it('should return false if startAfter is 0', () => {
      const state = {
        startAfter: 0,
      };
      const result = getters.shouldRenderLoadMoreButton(state);

      expect(result).toBe(false);
    });
  });
});
