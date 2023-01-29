/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/vue';
import App from './App';
import { store } from './store';
import { routes } from './router';
import { getAuth } from './auth';
import { createStore } from 'vuex';
import { apiRequest } from './store/actions/api';
import { createRouter, createWebHashHistory } from 'vue-router';

jest.mock('./auth');
jest.mock('./store/actions/api');

describe('when logged in', () => {
  describe('when no posts exist', () => {
    test('it renders "No posts yet"', async () => {
      getAuth.mockReturnValue({
        onAuthStateChanged: jest.fn(() => ({
          email: 'test',
          displayName: 'John Doe',
        })),
      });
      apiRequest.mockResolvedValueOnce({
        data: {
          results: [],
          remainingMessages: 1,
          nextPageToken: null,
        },
      });

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

      const initialState = {
        ...store,
        state: {
          ...store.state,
          user: {
            email: 'test',
            displayName: 'John Doe',
            emailVerified: true,
          },
          loggedIn: true,
          posts: [],
        },
      };

      const storeInstance = createStore(initialState);

      const routerInstance = createRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        history: createWebHashHistory(),
        routes,
      });

      routerInstance.push('/');
      await routerInstance.isReady();

      const component = render(App, {
        global: {
          plugins: [storeInstance, routerInstance],
        },
      });

      const { findByText } = component;

      await findByText('No posts yet.');
    });
  });
});
