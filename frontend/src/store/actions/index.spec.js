import actions from '.';
import { apiRequest } from './api';

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
    afterEach(() => {
      jest.resetAllMocks();
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
  });
});
