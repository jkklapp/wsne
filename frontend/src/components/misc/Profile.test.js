import { render } from '@testing-library/vue';
import Profile from './Profile.vue';
import { store } from '../../store';
import { createStore } from 'vuex';

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
    });
  });

  describe('when user loaded', () => {
    test('it renders the user name', async () => {
      const component = renderComponent({
        state: {
          user: {
            email: '',
            displayName: 'John',
          },
        },
      });

      const { getByText } = component;

      getByText('Name: John');
    });
  });
});
