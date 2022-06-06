import { CollectionReference } from '@google-cloud/firestore';
import { PostDocument } from './posts.types';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service;
  beforeEach(() => {
    const postsCollection: CollectionReference<PostDocument> = null;
    service = new PostsService(postsCollection);
  });
  describe('getMultiple', () => {
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
      const posts = await service.getMultiple(limit, startAfter);
      expect(posts).toEqual({
        results: [
          {
            id: '1',
            userId: '1',
            message: 'message',
            date: 10000,
          },
          {
            id: '2',
            userId: '2',
            message: 'message',
            date: 11000,
          },
        ],
        nextPageToken: 11000,
      });
      expect(postsCollectionMock.orderBy).toHaveBeenCalledWith('date', 'desc');
      expect(postsCollectionMock.startAfter).toHaveBeenCalledWith('');
      expect(postsCollectionMock.limit).toHaveBeenCalledWith(limit);
      expect(postsCollectionMock.get).toHaveBeenCalled();
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
      expect(postsCollectionMock.where.mock.calls).toEqual([
        ['userId', '==', '1'],
        ['date', '>=', 10000],
      ]);
      expect(postsCollectionMock.get).toHaveBeenCalled();
    });
  });
  describe('create', () => {
    let postsCollectionMock;
    let dataMock;
    beforeEach(() => {
      dataMock = jest.fn().mockReturnValue({
        message: 'test',
        date: 100000,
        userId: '1234',
      });
      postsCollectionMock = {
        get: jest.fn().mockResolvedValue({
          size: 0,
          id: '1',
          data: dataMock,
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
      });
      expect(postsCollectionMock.doc).toHaveBeenCalled();
      expect(postsCollectionMock.set).toHaveBeenCalledWith({
        date: expect.anything(),
        message: 'test',
        userId: '1234',
      });
      expect(dataMock).toHaveBeenCalled();
    });
  });
});
