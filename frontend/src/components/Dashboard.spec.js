import { mount } from '@vue/test-utils';
import Dashboard from './Dashboard.vue';
import firebase from 'firebase/compat/app';
import axios from 'axios';

jest.mock('firebase/compat/app', () => {
  return {
    auth: jest.fn(),
  };
});
jest.mock('axios');

const POSTS_RESPONSE_FIXTURE = [
  {
    id: '1',
    message: 'Hello World',
  },
];

describe('Dashboard', () => {
  beforeEach(() => {
    firebase.auth.mockReturnValue({
      currentUser: {
        email: 'example@gmail.com',
        uid: 1,
        getIdToken: jest.fn().mockReturnValue(Promise.resolve('token')),
      },
    });
    axios.get.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE });
    axios.post.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE[0] });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('displays "Dashboard" when "isLoggedIn" is true', () => {
    const wrapper = mount(Dashboard, {
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

  it('displays an input field when "isLoggedIn" is true', () => {
    const wrapper = mount(Dashboard, {
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

  it('can input message in input field', () => {
    const wrapper = mount(Dashboard, {
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

  it('will render posts', () => {
    const wrapper = mount(Dashboard, {
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
