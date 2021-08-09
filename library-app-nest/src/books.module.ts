import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './controllers/books.controller';
import { Book, BookComment, BookCommentSchema, BookSchema } from './models/db';
import { BooksService, BooksCommentsService } from './services';
import { BooksCommentsGateWay } from './sockets/books-comments.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: BookComment.name, schema: BookCommentSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksCommentsService, BooksCommentsGateWay],
  exports: [BooksService, BooksCommentsService, BooksCommentsGateWay],
})

export class BooksModule {}
