import { mount } from '@vue/test-utils';
import Posts from './Posts.vue';
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
  mount(Posts, {
    computed: {
      posts: {
        get() {
          return POSTS_RESPONSE_FIXTURE;
        },
      },
      isLoading: {
        get() {
          return false;
        },
      },
    },
    global: {
      stubs: ['router-link', 'Post'],
      mocks: {
        $route: {
          params: {
            parentId: '',
          },
        },
        $store: {
          dispatch: mockDispatch,
          state,
        },
      },
    },
  });

describe('Posts', () => {
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
  it('will render posts', () => {
    expect(wrapper.findComponent(Post).exists()).toEqual(true);
  });
  describe('methods', () => {
    describe('shouldRenderBackToTopButton', () => {
      it('should return true if startAfter is -1', () => {
        wrapper = mountComponent({
          startAfter: -1,
        });

        const result = wrapper.vm.shouldRenderBackToTopButton();

        expect(result).toBe(true);
      });
      it('should return false if startAfter is not -1', () => {
        wrapper = mountComponent();
        const result = wrapper.vm.shouldRenderBackToTopButton();

        expect(result).toBe(false);
      });
    });
    describe('shouldRenderLoadMoreButton', () => {
      it('should return true if startAfter is greater than 0', () => {
        wrapper = mountComponent({ startAfter: 1 });

        const result = wrapper.vm.shouldRenderLoadMoreButton();

        expect(result).toBe(true);
      });
      it('should return false if startAfter is 0', () => {
        wrapper = mountComponent({ startAfter: 0 });

        const result = wrapper.vm.shouldRenderLoadMoreButton();

        expect(result).toBe(false);
      });
    });
  });
});
