import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { BooksRepository } from './services/books-service';

@Module({
  controllers: [BooksController],
  providers: [BooksRepository],
  exports: [BooksRepository],
})

export class BooksModule {}
