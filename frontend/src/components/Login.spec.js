import { mount } from '@vue/test-utils';
import Login from './Login.vue';

describe('Login', () => {
  describe('Email field', () => {
    describe('when entering "test@test.com"', () => {
      it('sets the input value to "test@test.com', async () => {
        const wrapper = mount(Login);

        const input = wrapper.find('input[type="email"]');

        await input.setValue('test@test.com');

        expect(input.element.value).toBe('test@test.com');
      });
    });
  });
});
