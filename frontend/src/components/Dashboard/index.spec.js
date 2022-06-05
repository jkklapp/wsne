import { shallowMount } from '@vue/test-utils';
import Dashboard from '.';
import Input from './Input.vue';
import Posts from './Posts.vue';
import { getAuth } from '../../auth';

jest.mock('../../auth');

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
      onAuthStateChanged: jest.fn(() => ({
        email: 'test',
        displayName: 'John Doe',
      })),
    });
  });
  afterEach(() => {
    process.env = old_env;
    jest.resetAllMocks();
  });
  it('displays Input and Posts components when "isLoggedIn" is true', () => {
    const wrapper = shallowMount(Dashboard, {
      computed: {
        isLoggedIn: {
          get() {
            return true;
          },
        },
      },
    });

    expect(wrapper.findComponent(Posts).exists()).toBe(true);
    expect(wrapper.findComponent(Input).exists()).toBe(true);
  });
});
