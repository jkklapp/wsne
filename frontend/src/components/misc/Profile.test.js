import { render } from '@testing-library/vue';
import Profile from './Profile.vue';
import { store } from '../../store';
import { createStore } from 'vuex';
import { getAuth } from '../../auth';

jest.mock('../../auth');

const renderComponent = (customStore) => {
  const mergedStoreInstance = createStore({
    ...store,
    ...customStore,
  });
  return render(Profile, {
    global: {
      plugins: [mergedStoreInstance],
    },
  });
};

describe('Profile', () => {
  describe('when user is not yet loaded', () => {
    beforeEach(() => {
      getAuth.mockReturnValue({
        onAuthStateChanged: jest.fn(() => ({})),
      });
    });
    test('it shows a question mark', async () => {
      const component = renderComponent({
        state: {
          user: {
            email: '',
            displayName: '',
          },
        },
      });

      const { getByText } = component;

      getByText('Name: ?');
      getByText('Email: ?');
    });
  });

  describe('when user loaded', () => {
    beforeEach(() => {
      getAuth.mockReturnValue({
        onAuthStateChanged: jest.fn(() => ({
          email: 'test',
          displayName: 'John Doe',
          emailVerified: true,
        })),
      });
    });
    test('it renders the user name', async () => {
      const component = renderComponent({
        state: {
          user: {
            email: 'john@email.com',
            displayName: 'John',
          },
        },
      });

      const { getByText } = component;

      getByText('Name: John');
      getByText('Email: john@email.com');
    });
  });
});
