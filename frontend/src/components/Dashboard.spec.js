import { mount } from '@vue/test-utils';
import Dashboard from './Dashboard.vue';

test('displays "Dashboard" when "isLoggedIn" is true', () => {
  const wrapper = mount(Dashboard, {
    data() {
      return {
        isLoggedIn: true,
      };
    },
  });

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Dashboard');
});

test('displays an input field when "isLoggedIn" is true', () => {
  const wrapper = mount(Dashboard, {
    data() {
      return {
        isLoggedIn: true,
      };
    },
  });

  // Assert the rendered text of the component
  expect(wrapper.find('input').exists()).toBe(true);
});

test('can input message in input field', () => {
  const wrapper = mount(Dashboard, {
    data() {
      return {
        isLoggedIn: true,
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
