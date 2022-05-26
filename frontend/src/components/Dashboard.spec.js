import { mount } from '@vue/test-utils';
import Dashboard from './Dashboard.vue';

test('displays "You are logged in!" when "isLoggedIn" is true', () => {
  const wrapper = mount(Dashboard, {
    data() {
      return {
        isLoggedIn: true,
      };
    },
  });

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('You are logged in!');
});
