/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import App from './App';
import { store } from './store';
import { waitFor } from '@testing-library/vue';
import router from './router';
import { getAuth } from './auth';
import { createStore } from 'vuex';
import { apiRequest } from './store/actions/api';

jest.mock('./auth');
jest.mock('./store/actions/api');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const userFixture = {
  email: 'test',
  displayName: 'John Doe',
  emailVerified: true,
};

describe('when logged in', () => {
  beforeEach(() => {
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn(() => userFixture),
    });
  });
  describe('when no posts exist', () => {
    let component;
    beforeEach(() => {
      apiRequest.mockResolvedValueOnce({
        data: {
          results: [],
          remainingMessages: 1,
          nextPageToken: null,
        },
      });
      const initialState = {
        ...store,
        state: {
          ...store.state,
          user: userFixture,
          loggedIn: true,
        },
      };

      const storeInstance = createStore(initialState);
      component = render(App, {
        global: {
          plugins: [storeInstance, router],
        },
      });
    });
    describe('when navigating to /', () => {
      test('it renders "No posts yet"', async () => {
        router.push('/');
        await router.isReady();

        const { findByText } = component;

        await findByText('No posts yet.');
      });
    });
    describe('when navigating to /profile', () => {
      test('it shows name and email', async () => {
        router.push('/profile');
        await router.isReady();

        const { getByText } = component;
        await waitFor(() => {
          getByText('Name: John Doe');
          getByText('Email: test');
        });
      });
    });
  });
});
