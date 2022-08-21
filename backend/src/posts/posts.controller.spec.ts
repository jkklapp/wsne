import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

jest.mock('./utils', () => {
  return {
    getDisplayNameByUserId: jest
      .fn()
      .mockResolvedValueOnce('John Doe')
      .mockResolvedValue('Jane Doe'),
  };
});

describe('PostsController', () => {
  let c: PostsController;
  let s: PostsService;
  let old_env;

  beforeEach(() => {
    const collection = null;
    s = new PostsService(collection);
    c = new PostsController(s);
    old_env = process.env;
    process.env = { MAX_NUMBER_POSTS_PER_DAY: '5', MAX_MESSAGE_LENGTH: '100' };
    jest.spyOn(s, 'countAllforUserByDate').mockResolvedValue(0);
    jest.spyOn(s, 'countAllForParentId').mockResolvedValue(0);
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
            likes: [],
          },
        ],
        remainingMessages: 10,
        nextPageToken: null,
      };
      jest
        .spyOn(s, 'getMultiple')
        .mockImplementation(() => Promise.resolve(result));

      expect(await c.getMultiple({ user: { user_id: '1234' } }, 10)).toEqual({
        nextPageToken: null,
        remainingMessages: 5,
        results: [
          {
            date: 100000,
            message: 'test',
            userId: '1234',
            userName: 'John Doe',
            likes: 0,
            likedByMe: false,
            comments: 0,
          },
        ],
      });
    });
    describe('when passing a parentId paramenter', () => {
      it('returns only messages with that parentId', async () => {
        const result = {
          results: [
            {
              message: 'test',
              date: 100000,
              userId: '1234',
              likes: [],
              parentId: '123',
            },
          ],
          remainingMessages: 10,
          nextPageToken: null,
        };
        jest
          .spyOn(s, 'getMultiple')
          .mockImplementation(() => Promise.resolve(result));

        expect(
          await c.getMultiple({ user: { user_id: '1234' } }, 10, null, '123'),
        ).toEqual({
          nextPageToken: null,
          remainingMessages: 5,
          results: [
            {
              date: 100000,
              message: 'test',
              userId: '1234',
              userName: 'Jane Doe',
              likes: 0,
              likedByMe: false,
              parentId: '123',
              comments: 0,
            },
          ],
        });
      });
    });
  });
  describe('create', () => {
    beforeEach(() => {
      jest.spyOn(s, 'create').mockResolvedValue({
        message: 'test',
        date: 100000,
        userId: '1234',
        likes: [],
      });
    });
    it('should return a new post', async () => {
      expect(
        await c.create(
          { user: { user_id: '1234', name: 'Test' } },
          { message: 'test' },
        ),
      ).toEqual({
        message: 'test',
        date: 100000,
        userId: '1234',
        userName: 'Test',
        likes: 0,
        likedByMe: false,
        comments: 0,
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
      expect(
        await c.update({ user: { user_id: '1234' } }, '1', { like: true }),
      ).toEqual({
        message: 'test',
        date: 100000,
        userId: '1234',
        userName: 'Jane Doe',
        likes: 1,
        likedByMe: true,
        comments: 0,
      });
    });
  });
});
