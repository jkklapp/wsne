import { Controller } from './controller';
import { Service } from './service';

describe('Controller', () => {
  let c: Controller;
  let s: Service;

  beforeEach(() => {
    const collection = null;
    s = new Service(collection);
    c = new Controller(s);
  });

  describe('findAll', () => {
    it('should return an array of ', async () => {
      const result = {
        results: [
          {
            message: 'test',
            date: 100000,
            userId: '1234',
            userName: 'Test',
          },
        ],
        nextPageToken: null,
      };
      jest
        .spyOn(s, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await c.findAll(10, null)).toBe(result);
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
      jest.spyOn(s, 'countAllforUserByDate').mockResolvedValue(0);
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
      let old_env;
      beforeEach(() => {
        old_env = process.env;
        process.env = { MAX_NUMBER_POSTS_PER_DAY: '5' };
        jest.spyOn(s, 'countAllforUserByDate').mockResolvedValue(5);
      });
      afterEach(() => {
        process.env = old_env;
        jest.restoreAllMocks();
      });
      it('should throw an error', async () => {
        await expect(
          c.create({ user: { user_id: '1234' } }, { message: 'test' }),
        ).rejects.toThrow();
      });
    });
  });
});
