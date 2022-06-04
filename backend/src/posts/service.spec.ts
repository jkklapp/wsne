import { CollectionReference } from '@google-cloud/firestore';
import { PostDocument } from './document';
import { Service } from './service';

jest.mock('./utils', () => {
  return {
    getDisplayNameByUserId: jest
      .fn()
      .mockResolvedValueOnce('John Doe')
      .mockResolvedValueOnce('Jane Doe'),
  };
});

describe('Service', () => {
  let old_env;
  let service;
  beforeEach(() => {
    const postsCollection: CollectionReference<PostDocument> = null;
    service = new Service(postsCollection);
  });
  describe('findAll', () => {
    let postsCollectionMock;
    beforeEach(() => {
      const docs = [
        {
          id: '1',
          data: jest.fn().mockReturnValue({
            userId: '1',
            message: 'message',
            date: 10000,
          }),
        },
        {
          id: '2',
          data: jest.fn().mockReturnValue({
            userId: '2',
            message: 'message',
            date: 11000,
          }),
        },
      ];
      postsCollectionMock = {
        orderBy: jest.fn().mockReturnThis(),
        startAfter: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({
          docs,
          query: {
            offset: jest.fn().mockReturnValue({
              get: jest.fn().mockResolvedValue({ empty: false }),
            }),
          },
        }),
      };
      service.postsCollection = postsCollectionMock;
    });
    afterEach(() => {
      process.env = old_env;
      jest.restoreAllMocks();
    });
    it('should return an array of posts', async () => {
      const limit = 10;
      const startAfter = undefined;
      const posts = await service.findAll(limit, startAfter);
      expect(posts).toEqual({
        results: [
          {
            id: '1',
            userId: '1',
            message: 'message',
            date: 10000,
            userName: 'John Doe',
          },
          {
            id: '2',
            userId: '2',
            message: 'message',
            date: 11000,
            userName: 'Jane Doe',
          },
        ],
        nextPageToken: 11000,
      });
    });
  });
  describe('create', () => {
    let postsCollectionMock;
    beforeEach(() => {
      old_env = process.env;
      process.env = { MAX_NUMBER_POSTS_PER_DAY: '5' };
      postsCollectionMock = {
        where: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({
          size: 0,
          id: '1',
          data: jest.fn().mockReturnValue({
            message: 'test',
            date: 100000,
            userId: '1234',
          }),
        }),
        doc: jest.fn().mockReturnThis(),
        set: jest.fn().mockResolvedValueOnce({}),
      };
      service.postsCollection = postsCollectionMock;
    });
    afterEach(() => {
      process.env = old_env;
      jest.restoreAllMocks();
    });
    it('should return a new post', async () => {
      const post = {
        message: 'test',
      };

      const result = await service.create(post, {
        user_id: '1234',
        name: 'Test',
      });

      expect(result).toEqual({
        date: 100000,
        id: '1',
        message: 'test',
        userId: '1234',
        userName: 'Test',
      });
    });
    describe('when user has reached max number of posts per day', () => {
      let postsCollectionMock;
      beforeEach(() => {
        postsCollectionMock = {
          where: jest.fn().mockReturnThis(),
          get: jest.fn().mockResolvedValueOnce({ size: 5 }),
        };
        service.postsCollection = postsCollectionMock;
      });
      afterEach(() => {
        jest.restoreAllMocks();
      });
      it('throws an error', async () => {
        const user = {
          user_id: '1',
          email: 'test@test.com',
        };
        const message = 'new message';

        await expect(service.create({ message }, user)).rejects.toThrow(
          'You have reached the limit of 5 posts per day',
        );
      });
    });
  });
});
