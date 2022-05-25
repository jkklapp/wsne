import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as express from 'express';

const server = express();

const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  return app.init();
};

createNestServer(server)
  .then((_) => console.log('Nest ready'))
  .catch((err) => console.log('Nest broken', err));

export const api = functions.region('europe-west2').https.onRequest(server);
export const api_test = functions
  .region('europe-west2')
  .https.onRequest(server);
