import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

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
    xdescribe('when doing a GET /posts authorized', () => {
      it('should return a 200 with an empty list', () => {
        return request(app.getHttpServer())
          .get('/posts')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer token')
          .expect(200)
          .expect([]);
      });
    });
  });
  describe('/users/exists', () => {
    describe('when doing a GET /users/exists', () => {
      it('should return 200 and "exits": false', () => {
        return request(app.getHttpServer())
          .get('/users/exists')
          .expect(200)
          .expect({ exists: false });
      });
    });
  });
});
