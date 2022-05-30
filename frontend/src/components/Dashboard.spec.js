import { mount } from '@vue/test-utils';
import Dashboard from './Dashboard.vue';
import { getAuth } from '../auth';
import { apiRequest } from '../store/actions/api';

jest.mock('../auth');
jest.mock('../store/actions/api');

const POSTS_RESPONSE_FIXTURE = [
  {
    id: '1',
    message: 'Hello World',
  },
];

describe('Dashboard', () => {
  let old_env;
  beforeEach(() => {
    old_env = process.env;
    process.env = {
      VUE_APP_API_BASE: 'https://my-api.com',
      VUE_APP_INPUT_LABEL: 'Fluunk',
      VUE_APP_INPUT_CTA_LABEL: 'Fluu',
    };
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn(() => ({ email: 'test' })),
    });
    apiRequest.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE });
  });
  afterEach(() => {
    process.env = old_env;
    jest.resetAllMocks();
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
              message: 'Hello World!',
              date: { _seconds: 100000 },
            },
          ],
        };
      },
    });

    // Assert the rendered text of the component
    expect(wrapper.find('p').text()).toContain('Hello World!');
  });
  describe('when clicking on "Submit"', () => {
    it('will post a message', (done) => {
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
      input.setValue('Hello World');

      // Find the button element
      const button = wrapper.find('button');

      expect(button.text()).toEqual(process.env.VUE_APP_INPUT_CTA_LABEL);

      // Click the button
      button.trigger('click');

      // Assert the rendered text of the component
      expect(apiRequest).toHaveBeenCalledWith('POST', '/posts', {
        message: 'Hello World',
      });

      done();
    });
  });
});
