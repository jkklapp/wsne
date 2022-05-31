import { shallowMount } from '@vue/test-utils';
import Dashboard from '.';
import Input from './Input.vue';
import Posts from './Posts.vue';

describe('Dashboard', () => {
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
