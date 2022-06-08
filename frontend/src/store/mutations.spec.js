import mutations from './mutations';

// destructure assign `mutations`
const { SET_USER, SET_POSTS, PUSH_MESSAGE, SET_MESSAGE } = mutations;

describe('mutations', () => {
  describe('SET_USER', () => {
    it('can set the user', () => {
      const userFixture = { email: 'john@doe.com', uid: '123' };
      // mock state
      const state = { user: null };
      // apply mutation
      SET_USER(state, userFixture);
      // assert result
      expect(state.user).toEqual(userFixture);
    });
  });
  describe('SET_POSTS', () => {
    it('can set the posts', () => {
      const postsFixture = [
        {
          id: '1',
          message: 'Hello World',
        },
      ];
      // mock state
      const state = { posts: [] };
      // apply mutation
      SET_POSTS(state, { results: postsFixture });
      // assert result
      expect(state.posts).toEqual(postsFixture);
    });
  });
  describe('PUSH_MESSAGE', () => {
    it('can push a message to the posts', () => {
      const messageFixture = {
        id: '1',
        message: 'Hello World',
      };
      // mock state
      const state = { posts: [], user: { displayName: 'Test' } };
      // apply mutation
      PUSH_MESSAGE(state, messageFixture);
      // assert result
      expect(state.posts).toEqual([{ ...messageFixture, userName: 'Test' }]);
    });
  });
  describe('SET_MESSAGE', () => {
    it('can set the message', () => {
      const messageFixture = {
        id: '1',
        message: 'Hello World',
      };
      // mock state
      const state = { message: null };
      // apply mutation
      SET_MESSAGE(state, messageFixture);
      // assert result
      expect(state.message).toEqual(messageFixture);
    });
  });
});
