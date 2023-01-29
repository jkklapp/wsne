/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/vue';
import App from './App';
import { store } from './store';
import router from './router';
import { getAuth } from './auth';
import { createStore } from 'vuex';
import { apiRequest } from './store/actions/api';
import { createRouter, createWebHashHistory } from 'vue-router';

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

describe('when logged in', () => {
  beforeEach(() => {
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn(() => ({
        email: 'test',
        displayName: 'John Doe',
        emailVerified: true,
      })),
    });
  });
  describe('when no posts exist', () => {
    beforeEach(() => {
      apiRequest.mockResolvedValueOnce({
        data: {
          results: [],
          remainingMessages: 1,
          nextPageToken: null,
        },
      });
    });
    test('it renders "No posts yet"', async () => {
      const initialState = {
        ...store,
        state: {
          ...store.state,
          loggedIn: true,
        },
      };

      const storeInstance = createStore(initialState);

      router.push('/');
      await router.isReady();

      const component = render(App, {
        global: {
          plugins: [storeInstance, router],
        },
      });

      const { findByText } = component;

      await findByText('No posts yet.');
    });
  });
});
