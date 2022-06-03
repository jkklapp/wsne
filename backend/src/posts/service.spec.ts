import { CollectionReference } from '@google-cloud/firestore';
import { PostDocument } from './document';
import { Service } from './service';

describe('Service', () => {
  let old_env;
  let service;
  beforeEach(() => {
    const postsCollection: CollectionReference<PostDocument> = null;
    service = new Service(postsCollection);
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
        // old_env = process.env;
        // process.env = { MAX_NUMBER_POSTS_PER_DAY: '5' };
        postsCollectionMock = {
          where: jest.fn().mockReturnThis(),
          get: jest.fn().mockResolvedValueOnce({ size: 5 }),
        };
        service.postsCollection = postsCollectionMock;
      });
      afterEach(() => {
        // process.env = old_env;
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
