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
        uid: 123,
      };
      testAction(
        actions.setUser,
        userFixture,
        { user: null },
        [
          {
            type: 'SET_USER',
            payload: userFixture,
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
            type: 'SET_POSTS',
            payload: POSTS_RESPONSE_FIXTURE,
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
        { posts: [] },
        [
          {
            type: 'PUSH_MESSAGE',
            payload: POSTS_RESPONSE_FIXTURE[0],
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
