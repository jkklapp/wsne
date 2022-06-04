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
  describe('countAllforUserByDate', () => {
    let postsCollectionMock;
    beforeEach(() => {
      postsCollectionMock = {
        where: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({
          size: 2,
        }),
      };
      service.postsCollection = postsCollectionMock;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should return the number of posts for a user', async () => {
      const userId = '1';
      const date = 10000;
      const count = await service.countAllforUserByDate(userId, date);
      expect(count).toEqual(2);
    });
  });
  describe('create', () => {
    let postsCollectionMock;
    beforeEach(() => {
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
      jest.restoreAllMocks();
    });
    it('should return a new post', async () => {
      const result = await service.create('test', '1234', 'Test');

      expect(result).toEqual({
        date: 100000,
        id: '1',
        message: 'test',
        userId: '1234',
        userName: 'Test',
      });
    });
  });
});
