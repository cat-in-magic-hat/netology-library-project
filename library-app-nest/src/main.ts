import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as serviceAccount from './path/to/serviceAccountKey.json';
import { BOOKS_DB_SETTINGS } from './constants';


async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(<admin.ServiceAccount>serviceAccount),
    databaseURL: BOOKS_DB_SETTINGS.firebaseDbUrl
  });
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: (errors) => new BadRequestException(errors) }));
  await app.listen(3000);
}
bootstrap();
