import { mount } from '@vue/test-utils';
import Post from './Post.vue';
import { getAuth } from '../../auth';
import { apiRequest } from '../../store/actions/api';

jest.mock('../../auth');
jest.mock('../../store/actions/api');

const POSTS_RESPONSE_FIXTURE = [
  {
    id: '1',
    message: 'Hello World',
    date: new Date().getTime(),
    userName: 'John Doe',
    userId: '1',
    likes: 0,
    likedByMe: false,
    comments: 0,
    parentId: null,
  },
];

const mockDispatch = jest.fn();

const mountComponent = (state = {}) =>
  mount(Post, {
    propsData: {
      ...POSTS_RESPONSE_FIXTURE[0],
    },
    computed: {
      isPosting: {
        get() {
          return false;
        },
      },
      likingPost: {
        get() {
          return null;
        },
      },
    },
    global: {
      stubs: ['router-link'],
      mocks: {
        $route: {
          params: {
            parentId: '',
          },
        },
        $store: {
          dispatch: mockDispatch,
          state: state,
        },
      },
    },
  });

describe('Post', () => {
  let old_env;
  let wrapper;
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
    apiRequest.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE });
    wrapper = mountComponent();
  });
  afterEach(() => {
    process.env = old_env;
    jest.resetAllMocks();
  });
  describe('when passing props to Post', () => {
    it('renders the post correctly', () => {
      expect(wrapper.find('small').text()).toContain('a few seconds ago');
      expect(wrapper.find('span.message').text()).toContain('Hello World');
    });
  });
  describe('when clicking the light bulb icon', () => {
    it('should like the post', () => {
      wrapper.find('a.like').trigger('click');
      expect(mockDispatch).toHaveBeenCalledWith('toggleLike', {
        like: true,
        post: {
          comments: 0,
          date: expect.anything(),
          id: '1',
          likedByMe: false,
          likes: 0,
          message: 'Hello World',
          parentId: null,
          userName: 'John Doe',
        },
      });
    });
  });
});
