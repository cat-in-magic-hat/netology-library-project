import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './controllers/books.controller';
import { Book, BookSchema } from './models/db';
import { BooksRepository } from './repositories/books-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksRepository],
  exports: [BooksRepository],
})

export class BooksModule {}
