import { mount } from '@vue/test-utils';
import Dashboard from './Dashboard.vue';
import { createStore } from 'vuex';

jest.mock('firebase/compat/app', () => {
  return {
    auth: jest.fn(),
  };
});
jest.mock('axios');

describe('Dashboard', () => {
  let store;
  beforeEach(() => {
    store = createStore({
      actions: {
        fetchPosts: jest.fn(),
        postMessage: jest.fn(),
      },
    });
  });
  test('displays "Dashboard" when "isLoggedIn" is true', () => {
    const wrapper = mount(Dashboard, {
      store,
      data() {
        return {
          isLoggedIn: true,
          message: null,
          posts: [],
        };
      },
    });

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Dashboard');
  });

  test('displays an input field when "isLoggedIn" is true', () => {
    const wrapper = mount(Dashboard, {
      store,
      data() {
        return {
          isLoggedIn: true,
          message: null,
          posts: [],
        };
      },
    });

    // Assert the rendered text of the component
    expect(wrapper.find('input').exists()).toBe(true);
  });

  test('can input message in input field', () => {
    const wrapper = mount(Dashboard, {
      store,
      data() {
        return {
          isLoggedIn: true,
          message: null,
          posts: [],
        };
      },
    });

    // Find the input element
    const input = wrapper.find('input');

    // Set the input value
    input.setValue('Hello World!');

    // Assert the input value
    expect(input.element.value).toBe('Hello World!');
  });

  test('will render posts', () => {
    const wrapper = mount(Dashboard, {
      store,
      data() {
        return {
          isLoggedIn: true,
          message: null,
          posts: [
            {
              id: 1,
              message: 'Hello World!',
            },
          ],
        };
      },
    });

    // Assert the rendered text of the component
    expect(wrapper.find('li').text()).toContain('Hello World!');
  });
});
