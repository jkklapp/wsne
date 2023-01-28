import { render } from '@testing-library/vue';
import Input from './Input.vue';
import { store } from '../../store';
import { createStore } from 'vuex';

const renderComponent = (customStore) => {
  const mergedStoreInstance = createStore({
    ...store,
    ...customStore,
  });
  return render(Input, {
    global: {
      plugins: [mergedStoreInstance],
    },
  });
};

describe('Input', () => {
  test('shows number of fluus left', async () => {
    const component = renderComponent({
      state: {
        user: {
          emailVerified: true,
        },
        remainingMessages: 0,
      },
    });

    const { getByPlaceholderText } = component;

    getByPlaceholderText('You have 0 fluus left today');
  });
  describe('when initial state of remainingMessages is -1', () => {
    test('it is not sure how many fluus are left', () => {
      const component = renderComponent({
        state: {
          user: {
            emailVerified: true,
          },
          remainingMessages: -1,
        },
      });

      const { getByPlaceholderText } = component;

      getByPlaceholderText('I am not sure how many fluus you have yet...');
    });
  });
});
