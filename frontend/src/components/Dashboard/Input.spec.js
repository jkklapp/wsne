import { mount } from '@vue/test-utils';
import Input from './Input.vue';
import { getAuth } from '../../auth';
import { apiRequest } from '../../store/actions/api';

jest.mock('../../auth');
jest.mock('../../store/actions/api');

const POSTS_RESPONSE_FIXTURE = [
  {
    id: '1',
    message: 'Hello World',
  },
];

const mountComponent = (isPosting = false) => {
  return mount(Input, {
    computed: {
      inputLabel: () => 'Fluunk',
      inputCtaLabel: () => 'Fluu',
      isPosting: {
        get() {
          return isPosting;
        },
      },
    },
  });
};

describe('Input', () => {
  beforeEach(() => {
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn(() => ({ email: 'test' })),
    });
    apiRequest.mockResolvedValueOnce({ data: POSTS_RESPONSE_FIXTURE });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('can input message in input field', () => {
    const wrapper = mountComponent();

    // Find the input element
    const input = wrapper.find('input');

    // Set the input value
    input.setValue('Hello World!');

    // Assert the input value
    expect(input.element.value).toBe('Hello World!');
  });
  describe('submit button', () => {
    it('is not disabled', () => {
      const wrapper = mountComponent();

      // Find the submit button
      const submit = wrapper.find('button');

      // Assert the button is not disabled
      expect(submit.element.disabled).toBe(false);
    });
    describe('when clicking on "Submit"', () => {
      it('will post a message', (done) => {
        const wrapper = mountComponent();

        // Find the input element
        const input = wrapper.find('input');

        // Set the input value
        input.setValue('Hello World');

        // Find the button element
        const button = wrapper.find('button');

        expect(button.text()).toEqual('Fluu');

        // Click the button
        button.trigger('click');

        // Assert the rendered text of the component
        expect(apiRequest).toHaveBeenCalledWith('POST', '/posts', null, {
          message: 'Hello World',
        });

        done();
      });
    });
    describe('while message is being submitted', () => {
      it('disables the submit button', (done) => {
        const wrapper = mountComponent(true);

        // Find the input element
        const input = wrapper.find('input');

        // Set the input value
        input.setValue('Hello World');

        // Find the button element
        const button = wrapper.find('button');

        // Click the button
        button.trigger('click');

        // Assert the rendered text of the component
        expect(button.attributes('disabled')).toBe('');

        done();
      });
    });
  });
});
