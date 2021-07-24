import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BOOKS_DB_SETTINGS } from './constants';
import { BooksModule } from './books.module';

@Module({
  imports: [
    MongooseModule.forRoot(BOOKS_DB_SETTINGS.connectionString),
    BooksModule
  ]
})

export class AppModule {}
