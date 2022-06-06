import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

jest.mock('../users/utils', () => {
  return {
    getByUserName: jest
      .fn()
      .mockResolvedValue({ displayName: 'test', email: 'test@test.com' }),
    getByEmail: jest
      .fn()
      .mockResolvedValue({ displayName: 'test', email: 'test@test.com' }),
  };
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideGuard(FirebaseAuthGuard)
      // .useValue({ canActivate: jest.fn(() => Promise.resolve(true)) })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/posts', () => {
    describe('when doing a GET /posts unauthorized', () => {
      it('should return 401', () => {
        return request(app.getHttpServer()).get('/posts').expect(401);
      });
    });
  });
  describe('/users/exists', () => {
    describe('when doing a POST /users/exists with name "test"', () => {
      it('should return 202 and "exits": true', () => {
        return request(app.getHttpServer())
          .post('/users/exists')
          .send({ name: 'test' })
          .expect(202);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
