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
        loggedIn: true,
      };
      const result = getters.isLoggedIn(state);

      expect(result).toBe(true);
    });
    it('should return false if user is null', () => {
      const state = {
        user: { displayName: '', email: '' },
        loggedIn: false,
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
  describe('getPostById', () => {
    it('should return the post by id', () => {
      const state = {
        posts: [
          {
            id: '1',
            message: 'Hello World',
          },
          {
            id: '2',
            message: 'Hello World 2',
          },
        ],
      };
      const result = getters.getPostById(state, '2');

      expect(result).toEqual(state.posts[1]);
    });
  });
});
