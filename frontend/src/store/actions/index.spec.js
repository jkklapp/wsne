import actions from '.';
import { apiRequest, unAuthApiRequest } from './api';

jest.mock('./api');
// helper for testing action with expected mutations
const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0;

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count];

    try {
      expect(type).toEqual(mutation.type);
      expect(payload).toEqual(mutation.payload);
    } catch (error) {
      done(error);
    }

    count++;
    if (count >= expectedMutations.length) {
      done();
    }
  };

  // call the action with mocked store and arguments
  action({ commit, state }, payload);

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).toEqual(0);
    done();
  }
};

const POSTS_RESPONSE_FIXTURE = [
  {
    id: '1',
    message: 'Hello World',
  },
];

describe('actions', () => {
  describe('setUser', () => {
    it('makes the expected mutations', (done) => {
      const userFixture = {
        email: 'john@doe.com',
        displayName: 'John Doe',
        uid: 123,
      };
      testAction(
        actions.setUser,
        userFixture,
        { user: { displayName: '', email: '' }, loggedIn: false },
        [
          {
            type: 'SET_USER',
            payload: userFixture,
          },
          {
            type: 'SET_LOGGED_IN',
            payload: userFixture.email && userFixture.displayName,
          },
        ],
        done,
      );
    });
  });
  describe('fetchPosts', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('fetches posts from the API', (done) => {
      apiRequest.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE });

      testAction(
        actions.fetchPosts,
        { posts: [], startAfter: null, limit: 10 },
        { posts: [], startAfter: null, limit: 10 },
        [
          {
            type: 'IS_LOADING_POSTS',
            payload: true,
          },
          {
            type: 'SET_POSTS',
            payload: POSTS_RESPONSE_FIXTURE,
          },
          {
            type: 'SET_START_AFTER',
            payload: null,
          },
          {
            type: 'IS_LOADING_POSTS',
            payload: false,
          },
        ],
        () => {
          expect(apiRequest).toHaveBeenCalledWith('GET', '/posts', {
            limit: 10,
            startAfter: null,
          });
          done();
        },
      );
    });
  });
  describe('setMessage', () => {
    it('sets the message in the store', (done) => {
      testAction(
        actions.setMessage,
        'Hello World',
        { message: '' },
        [
          {
            type: 'SET_MESSAGE',
            payload: 'Hello World',
          },
        ],
        done,
      );
    });
  });
  describe('postMessage', () => {
    const date = new Date(2020, 3, 1);
    afterEach(() => {
      jest.resetAllMocks();
      jest.useRealTimers();
    });
    beforeEach(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(date);
    });
    it('posts the message to the API', (done) => {
      apiRequest.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE[0] });

      testAction(
        actions.postMessage,
        'Hello World',
        { posts: [], creatingPost: false },
        [
          {
            type: 'IS_CREATING_POST',
            payload: true,
          },
          {
            type: 'PUSH_MESSAGE',
            payload: {
              message: 'Hello World',
              date: expect.anything(),
            },
          },
          {
            type: 'IS_CREATING_POST',
            payload: false,
          },
        ],
        () => {
          expect(apiRequest).toHaveBeenCalledWith('POST', '/posts', null, {
            message: 'Hello World',
          });
          done();
        },
      );
    });
    it('can post a comment to a message', (done) => {
      apiRequest.mockResolvedValueOnce({
        data: { ...POSTS_RESPONSE_FIXTURE[0], parentId: '1' },
      });

      testAction(
        actions.postMessage,
        'Hello World 2',
        {
          posts: [{ id: '1', message: 'hello world' }],
          creatingPost: false,
          parentId: '1',
        },
        [
          {
            type: 'IS_CREATING_POST',
            payload: true,
          },
          {
            type: 'PUSH_COMMENT',
            payload: {
              message: 'Hello World 2',
              date: date.getTime(),
              parentId: '1',
            },
          },
          { type: 'POP_COMMENT' },
          {
            type: 'PUSH_COMMENT',
            payload: {
              message: 'Hello World 2',
              date: 1555555555555,
              parentId: '1',
            },
          },
          { type: 'INCREMENT_COMMENTS_COUNT' },
          {
            type: 'IS_CREATING_POST',
            payload: false,
          },
        ],
        () => {
          expect(apiRequest).toHaveBeenCalledWith('POST', '/posts', null, {
            message: 'Hello World 2',
            parentId: '1',
          });
          done();
        },
      );
    });
  });
  describe('toggleLike', () => {
    beforeEach(() => {
      apiRequest.mockResolvedValueOnce({
        data: { ...POSTS_RESPONSE_FIXTURE[0] },
      });
    });
    it('toggles the like on the message', (done) => {
      testAction(
        actions.toggleLike,
        {
          post: { id: '1', likes: 0, message: 'Hello World' },
          like: true,
        },
        { posts: [{ id: '1', message: 'Hello World', likes: 0 }] },
        [
          {
            type: 'SET_LIKING_POST',
            payload: '1',
          },
          {
            type: 'SET_POST_BY_ID',
            payload: {
              id: '1',
              message: 'Hello World',
              likes: 1,
              likedByMe: true,
            },
          },
          {
            type: 'SET_POST_BY_ID',
            payload: POSTS_RESPONSE_FIXTURE[0],
          },
          {
            type: 'SET_LIKING_POST',
            payload: null,
          },
        ],
        () => {
          expect(apiRequest).toHaveBeenCalledWith('PUT', '/posts/1', null, {
            like: true,
          });
          done();
        },
      );
    });
  });
  describe('checkExists', () => {
    beforeEach(() => {
      unAuthApiRequest.mockResolvedValueOnce({ data: { exists: true } });
    });
    it('checks if the username exists', (done) => {
      const payload = { name: 'test' };
      testAction(
        actions.checkExists,
        payload,
        {},
        [
          {
            type: 'SET_IS_CHECKING_NAME',
            payload: true,
          },
          {
            type: 'SET_USER_NAME_EXISTS',
            payload: true,
          },
          {
            type: 'SET_IS_CHECKING_NAME',
            payload: false,
          },
        ],
        () => {
          expect(unAuthApiRequest).toHaveBeenCalledWith(
            'POST',
            '/users/exists',
            payload,
          );
          done();
        },
      );
    });
  });
});
