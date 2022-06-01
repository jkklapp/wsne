import { Timestamp } from '@google-cloud/firestore';
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
            date: Timestamp.fromMillis(100000),
            author: '1234',
          },
        ],
        nextPageToken: false,
      };
      jest
        .spyOn(s, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await c.findAll(10, null)).toBe(result);
    });
  });
  describe('create', () => {
    it('should return a new post', async () => {
      const post = {
        message: 'test',
      };
      jest.spyOn(s, 'create').mockImplementation(() =>
        Promise.resolve({
          ...post,
          date: Timestamp.fromMillis(100000),
          author: '1234',
        }),
      );

      expect(await c.create({ user: { user_id: '1234' } }, post)).toEqual({
        ...post,
        date: Timestamp.fromMillis(100000),
        author: '1234',
      });
    });
  });
});
