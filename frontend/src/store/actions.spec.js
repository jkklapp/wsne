import actions from './actions';
import axios from 'axios';
import firebase from 'firebase/compat/app';

jest.mock('firebase/compat/app', () => {
  return {
    auth: jest.fn(),
  };
});
jest.mock('axios');

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

describe('actions', () => {
  describe('fetchUser', () => {
    it('makes the expected mutations', (done) => {
      const userFixture = {
        email: 'john@doe.com',
        uid: 123,
      };
      testAction(
        actions.fetchUser,
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
    let old_env;
    beforeEach(() => {
      old_env = process.env;
      process.env = {
        VUE_APP_API_BASE: 'https://my-api.com',
      };
    });
    afterEach(() => {
      process.env = old_env;
    });
    it('fetches posts from the API', (done) => {
      const postsFixture = [
        {
          id: '1',
          title: 'Hello World',
          content: 'Lorem ipsum dolor sit amet',
        },
      ];
      axios.get.mockResolvedValueOnce({ data: postsFixture });
      firebase.auth.mockReturnValue({
        currentUser: {
          email: 'example@gmail.com',
          uid: 1,
          getIdToken: jest.fn().mockReturnValue(Promise.resolve('token')),
        },
      });
      testAction(
        actions.fetchPosts,
        null,
        { posts: [] },
        [
          {
            type: 'SET_POSTS',
            payload: postsFixture,
          },
        ],
        () => {
          expect(axios.get).toHaveBeenCalledWith('https://my-api.com/posts', {
            headers: {
              Authorization: 'Bearer token',
              ContentType: 'application/json',
            },
          });
          done();
        },
      );
    });
  });
});
