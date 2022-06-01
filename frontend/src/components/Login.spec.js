import { mount } from '@vue/test-utils';
import Login from './Login.vue';

const mountComponent = () =>
  mount(Login, {
    global: {
      stubs: ['router-link'],
    },
  });

describe('Login', () => {
  describe('Email field', () => {
    describe('when entering "test@test.com"', () => {
      it('sets the input value to "test@test.com', async () => {
        const wrapper = mountComponent();

        const input = wrapper.find('input[type="email"]');

        await input.setValue('test@test.com');

        expect(input.element.value).toBe('test@test.com');
      });
    });
  });
  describe('Submit button', () => {
    it('is disabled by default', () => {
      const wrapper = mountComponent();

      const button = wrapper.find('button[type="submit"]');

      expect(button.element.disabled).toBe(true);
    });
    describe('when entering a valid email and a password', () => {
      it('is enabled', async () => {
        const wrapper = mountComponent();

        const input = wrapper.find('input[type="email"]');
        const password = wrapper.find('input[type="password"]');

        await input.setValue('test@test.com');
        await password.setValue('password');

        const button = wrapper.find('button');
        expect(button.element.disabled).toBe(false);
      });
    });
  });
});
