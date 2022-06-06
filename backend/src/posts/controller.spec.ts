import { Controller } from './controller';
import { Service } from './service';

jest.mock('./utils', () => {
  return {
    getDisplayNameByUserId: jest
      .fn()
      .mockResolvedValueOnce('John Doe')
      .mockResolvedValueOnce('Jane Doe'),
  };
});

describe('Controller', () => {
  let c: Controller;
  let s: Service;
  let old_env;

  beforeEach(() => {
    const collection = null;
    s = new Service(collection);
    c = new Controller(s);
    old_env = process.env;
    process.env = { MAX_NUMBER_POSTS_PER_DAY: '5', MAX_MESSAGE_LENGTH: '100' };
    jest.spyOn(s, 'countAllforUserByDate').mockResolvedValue(0);
  });
  afterEach(() => {
    process.env = old_env;
    jest.restoreAllMocks();
  });
  describe('getMultiple', () => {
    it('should return an array of ', async () => {
      const result = {
        results: [
          {
            message: 'test',
            date: 100000,
            userId: '1234',
          },
        ],
        remainingMessages: 10,
        nextPageToken: null,
      };
      jest
        .spyOn(s, 'getMultiple')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await c.getMultiple({ user: { user_id: '1234' } }, 10, null),
      ).toEqual({
        nextPageToken: null,
        remainingMessages: 5,
        results: [
          {
            date: 100000,
            message: 'test',
            userId: '1234',
            userName: 'John Doe',
          },
        ],
      });
    });
  });
  describe('create', () => {
    beforeEach(() => {
      jest.spyOn(s, 'create').mockResolvedValue({
        message: 'test',
        date: 100000,
        userId: '1234',
        userName: 'Test',
      });
    });
    it('should return a new post', async () => {
      expect(
        await c.create({ user: { user_id: '1234' } }, { message: 'test' }),
      ).toEqual({
        message: 'test',
        date: 100000,
        userId: '1234',
        userName: 'Test',
      });
    });
    describe('when the user has reached the max number of posts per day', () => {
      beforeEach(() => {
        jest.spyOn(s, 'countAllforUserByDate').mockResolvedValue(5);
      });
      it('should throw an error', async () => {
        await expect(
          c.create({ user: { user_id: '1234' } }, { message: 'test' }),
        ).rejects.toThrow();
      });
    });
    describe('when the message is too long', () => {
      it('should throw an error', async () => {
        await expect(
          c.create(
            { user: { user_id: '1234' } },
            { message: 'test'.repeat(100) },
          ),
        ).rejects.toThrow();
        expect(s.create).not.toHaveBeenCalled();
      });
    });
  });
  describe('update', () => {
    beforeEach(() => {
      jest.spyOn(s, 'get').mockResolvedValue({
        message: 'test',
        date: 100000,
        userId: '1234',
        likes: ['1234'],
      });
      jest.spyOn(s, 'exists').mockResolvedValue(true);
      s.toggleLike = jest.fn();
    });
    it('should add a like in the doc', async () => {
      expect(await c.update({ user: { user_id: '1234' } }, '1')).toEqual({
        message: 'test',
        date: 100000,
        userId: '1234',
        userName: 'Jane Doe',
        likes: ['1234'],
      });
    });
  });
});
