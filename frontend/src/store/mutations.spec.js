import mutations from './mutations';

// destructure assign `mutations`
const { SET_USER, SET_POSTS } = mutations;

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
          title: 'Hello World',
          content: 'Lorem ipsum dolor sit amet',
        },
      ];
      // mock state
      const state = { posts: [] };
      // apply mutation
      SET_POSTS(state, postsFixture);
      // assert result
      expect(state.posts).toEqual(postsFixture);
    });
  });
});
