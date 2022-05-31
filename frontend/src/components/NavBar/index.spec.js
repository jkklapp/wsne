import { shallowMount } from '@vue/test-utils';
import NavBar from '.';
import ThemeToggle from './ThemeToggle.vue';
import UserMenu from './UserMenu.vue';

describe('NavBar', () => {
  it('displays an ThemeToggle and UserMenu when "isLoggedIn" is true', () => {
    const wrapper = shallowMount(NavBar, {
      computed: {
        isLoggedIn: {
          get() {
            return true;
          },
        },
      },
    });

    expect(wrapper.findComponent(UserMenu).exists()).toBe(true);
    expect(wrapper.findComponent(ThemeToggle).exists()).toBe(true);
  });
});
