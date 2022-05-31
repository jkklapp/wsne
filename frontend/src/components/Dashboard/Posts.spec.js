import { mount } from '@vue/test-utils';
import Posts from './Posts.vue';
import { getAuth } from '../../auth';
import { apiRequest } from '../../store/actions/api';

jest.mock('../../auth');
jest.mock('../../store/actions/api');

const POSTS_RESPONSE_FIXTURE = [
  {
    id: '1',
    message: 'Hello World',
    date: {
      _seconds: new Date().getTime() / 1000,
    }
  },
];

describe('Posts', () => {
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
  it('will render posts', () => {
    const wrapper = mount(Posts, {
      computed: {
        posts: {
          get() {
            return POSTS_RESPONSE_FIXTURE;
          },
        },
      },
    });

    // Assert the rendered text of the component
    expect(wrapper.find('p').text()).toContain('Hello World a few seconds ago');
  });
});
