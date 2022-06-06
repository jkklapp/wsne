import { mount } from '@vue/test-utils';
import Register from './Register.vue';
import { getAuth } from '../auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

jest.mock('../auth');
jest.mock('firebase/auth');

describe('Register', () => {
  describe('Submit button', () => {
    it('is disabled by default', () => {
      const wrapper = mount(Register, {
        computed: {
          appName: () => 'Fluu',
          userEmailExists: {
            get() {
              return true;
            },
          },
          userNameExists: {
            get() {
              return true;
            },
          },
        },
        global: {
          stubs: ['router-link'],
        },
      });

      const button = wrapper.find('button[type="submit"]');

      expect(button.element.disabled).toEqual(true);
    });
    describe('when entering all the data', () => {
      it('is enabled', async () => {
        const wrapper = mount(Register, {
          computed: {
            appName: () => 'Fluu',
            userEmailExists: {
              get() {
                return true;
              },
            },
            userNameExists: {
              get() {
                return true;
              },
            },
          },
          global: {
            stubs: ['router-link'],
          },
        });

        const username = wrapper.find('input[type="text"]');
        const email = wrapper.find('input[type="email"]');
        const password = wrapper.find('input[id="password"]');
        const confirm = wrapper.find('input[id="repeat-password"]');
        const acceptTerms = wrapper.find('input[type="checkbox"]');

        await username.setValue('test');
        await email.setValue('test@test.com');
        await password.setValue('password');
        await confirm.setValue('password');
        await acceptTerms.setChecked(true);

        const button = wrapper.find('button');
        expect(button.element.disabled).toEqual(false);
      });
    });
  });
  describe('methods', () => {
    let old_env;
    beforeEach(() => {
      old_env = process.env;
      process.env = {
        VUE_APP_API_BASE: 'https://my-api.com',
      };
      getAuth.mockReturnValue({
        currentUser: {
          email: 'test@test.com',
          uid: 1,
          getIdToken: jest.fn().mockReturnValue(Promise.resolve('token')),
        },
      });
      createUserWithEmailAndPassword.mockReturnValue(
        Promise.resolve({
          user: {
            email: 'test@test.com',
            uid: 1,
          },
        }),
      );
      updateProfile.mockReturnValue(Promise.resolve({}));
    });
    afterEach(() => {
      process.env = old_env;
      jest.resetAllMocks();
    });
    describe('submit', () => {
      const mockRouter = {
        replace: jest.fn(),
      };
      it('calls the submit method', async () => {
        const wrapper = mount(Register, {
          computed: {
            appName: () => 'Fluu',
            userEmailExists: {
              get() {
                return true;
              },
            },
            userNameExists: {
              get() {
                return true;
              },
            },
          },
          global: {
            stubs: ['router-link'],
            mocks: {
              $router: mockRouter,
            },
          },
        });

        const username = wrapper.find('input[type="text"]');
        const email = wrapper.find('input[type="email"]');
        const password = wrapper.find('input[id="password"]');

        await username.setValue('test');
        await email.setValue('test@test.com');
        await password.setValue('password');

        await wrapper.vm.submit();

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
          {
            currentUser: {
              email: 'test@test.com',
              getIdToken: expect.anything(),
              uid: 1,
            },
          },
          'test@test.com',
          'password',
        );
        expect(updateProfile).toHaveBeenCalledWith(
          { email: 'test@test.com', uid: 1 },
          { displayName: 'test' },
        );
        expect(mockRouter.replace).toHaveBeenCalledWith({ name: 'Dashboard' });
      });
    });
  });
});
