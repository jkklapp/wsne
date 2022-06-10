import mutations from './mutations';

// destructure assign `mutations`
const {
  INCREMENT_COMMENTS_COUNT,
  SET_USER,
  SET_POST_BY_ID,
  SET_POSTS,
  POP_COMMENT,
  POP_MESSAGE,
  PUSH_MESSAGE,
  PUSH_COMMENT,
  SET_MESSAGE,
} = mutations;

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
  describe('SET_POST_BY_ID', () => {
    it('can set the post by id', () => {
      const postFixture = { id: '123', message: 'hello2' };
      // mock state
      const state = { posts: [{ id: '123', message: 'hello1' }] };
      // apply mutation
      SET_POST_BY_ID(state, postFixture);
      // assert result
      expect(state.posts).toEqual([postFixture]);
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
      SET_POSTS(state, postsFixture);
      // assert result
      expect(state.posts).toEqual(postsFixture);
    });
  });
  describe('PUSH_MESSAGE', () => {
    it('can push a message to the posts', () => {
      const posts = [
        {
          id: '2',
          message: 'Hello World',
        },
      ];
      const messageFixture = {
        id: '1',
        message: 'Hello World 2',
      };
      // mock state
      const state = { posts, user: { displayName: 'Test' } };
      // apply mutation
      PUSH_MESSAGE(state, messageFixture);
      // assert result
      expect(state.posts).toEqual([
        { ...messageFixture, userName: 'Test' },
        ...posts,
      ]);
    });
  });
  describe('PUSH_COMMENT', () => {
    it('keeps the parent comment on top', () => {
      const messageFixture = {
        id: '1',
        message: 'Hello World',
        parentId: '2',
      };
      // mock state
      const state = {
        posts: [{ id: '2', message: 'I am the parent' }],
        user: { displayName: 'Test' },
      };
      // apply mutation
      PUSH_COMMENT(state, messageFixture);
      // assert result
      expect(state.posts).toEqual([
        { id: '2', message: 'I am the parent' },
        { ...messageFixture, userName: 'Test' },
      ]);
    });
  });
  describe('POP_MESSAGE', () => {
    it('can pop a message from the posts', () => {
      const posts = [
        {
          id: '2',
          message: 'Hello World',
        },
        {
          id: '1',
          message: 'Hello World 2',
        },
      ];
      // mock state
      const state = { posts };
      // apply mutation
      POP_MESSAGE(state);
      // assert result
      expect(state.posts).toEqual([posts[1]]);
    });
  });
  describe('POP_COMMENT', () => {
    it('can pop a comment from the posts', () => {
      const posts = [
        {
          id: '2',
          message: 'Hello World',
        },
        {
          id: '1',
          message: 'Hello World 2',
          parentId: '2',
        },
      ];
      // mock state
      const state = { posts };
      // apply mutation
      POP_COMMENT(state);
      // assert result
      expect(state.posts).toEqual([posts[0]]);
    });
  });
  describe('INCREMENT_COMMENTS_COUNT', () => {
    it('can increment the comments count', () => {
      const posts = [
        {
          id: '2',
          message: 'Hello World',
          comments: 0,
        },
        {
          id: '1',
          message: 'Hello World 2',
          parentId: '2',
        },
      ];
      // mock state
      const state = { posts, parentId: '2' };
      // apply mutation
      INCREMENT_COMMENTS_COUNT(state);
      // assert result
      expect(state.posts).toEqual(posts);
      expect(state.posts[0].comments).toEqual(1);
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
