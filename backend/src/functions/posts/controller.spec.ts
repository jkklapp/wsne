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
      const result = [
        {
          title: 'test',
          message: 'test',
          date: Timestamp.fromMillis(100000),
        },
      ];
      jest
        .spyOn(s, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await c.findAll()).toBe(result);
    });
  });
  describe('create', () => {
    it('should return a new post', async () => {
      const post = {
        title: 'test',
        message: 'test',
        date: Timestamp.fromMillis(100000),
      };
      jest.spyOn(s, 'create').mockImplementation(() => Promise.resolve(post));

      expect(await c.create(post)).toBe(post);
    });
  });
});
