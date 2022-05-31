import { mount } from '@vue/test-utils';
import UserMenu from './UserMenu';
import { getAuth } from '../../auth';

jest.mock('../../auth');

describe('UserMenu', () => {
  describe('when "user" is correctly populated', () => {
    describe('when clicking on the menu', () => {
      xit('can toggle the menu open', () => {
        const wrapper = mount(UserMenu, {
          computed: {
            user: {
              get() {
                return {
                  displayName: 'John Doe',
                  email: 'john.doe@email.com',
                };
              },
            },
          },
        });

        expect(wrapper.find('#dropdown')).toEqual(false);

        wrapper.find('#user-menu-button').trigger('click');

        expect(wrapper.find('#dropdown').text()).toEqual(true);
      });
    });
  });
  describe('methods', () => {
    describe('signOut', () => {
      const mockRouter = {
        replace: jest.fn(),
      };
      const mockStore = {
        dispatch: jest.fn(),
      };
      describe('when calling signOut', () => {
        beforeEach(() => {
          getAuth.mockReturnValue({
            signOut: jest.fn(() => Promise.resolve()),
          });
        });
        it('calls the signOut method in auth object', async () => {
          const wrapper = mount(UserMenu, {
            computed: {
              user: {
                get() {
                  return {
                    displayName: 'John Doe',
                    email: 'john.doe@email.com',
                  };
                },
              },
            },
            global: {
              mocks: {
                $router: mockRouter,
                $store: mockStore,
              },
            },
          });

          await wrapper.vm.signOut();

          expect(getAuth().signOut).toHaveBeenCalled();
          expect(mockStore.dispatch).toHaveBeenCalledWith('setUser', {
            displayName: '',
            email: '',
          });
          expect(mockRouter.replace).toHaveBeenCalledWith({
            name: 'Login',
          });
        });
      });
    });
  });
});
