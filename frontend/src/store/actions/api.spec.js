import { apiRequest } from './api';
import { getAuth } from '../../auth';
import axios from 'axios';

jest.mock('../../auth');
jest.mock('axios');

describe('apiRequest', () => {
  let old_env;
  beforeEach(() => {
    old_env = process.env;
    process.env = {
      VUE_APP_API_BASE: 'https://my-api.com',
    };
    getAuth.mockReturnValue({
      currentUser: {
        email: 'example@gmail.com',
        uid: 1,
        getIdToken: jest.fn().mockReturnValue(Promise.resolve('token')),
      },
    });
  });
  afterEach(() => {
    process.env = old_env;
    jest.resetAllMocks();
  });
  describe('when fetching data from /posts', () => {
    it('makes a GET request to /posts correctly', async (done) => {
      axios.mockResolvedValueOnce({ data: 'Hello World' });

      const method = 'GET';
      const url = '/posts';

      const { data } = await apiRequest(method, url);
      expect(data).toEqual('Hello World');
      expect(axios).toHaveBeenCalledWith({
        data: undefined,
        headers: {
          Authorization: 'Bearer token',
          ContentType: 'application/json',
        },
        method: 'GET',
        url: 'https://my-api.com/posts',
      });
      done();
    });
  });
  describe('when posting data to /posts', () => {
    it('makes a POST request to /posts correctly', async (done) => {
      axios.mockResolvedValueOnce({ data: 'Hello World' });

      const method = 'POST';
      const url = '/posts';
      const data = { message: 'Hello World' };

      const { data: response } = await apiRequest(method, url, null, data);
      expect(response).toEqual('Hello World');
      expect(axios).toHaveBeenCalledWith({
        data,
        headers: {
          Authorization: 'Bearer token',
          ContentType: 'application/json',
        },
        method: 'POST',
        url: 'https://my-api.com/posts',
        params: null,
      });
      done();
    });
  });
});
