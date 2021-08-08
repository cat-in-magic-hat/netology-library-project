import { Module } from '@nestjs/common';
import { BooksController } from "../../../src/controllers/books.controller";
import { BooksRepository } from "../../../src/repositories/books-repository";

@Module({
    providers: [BooksRepository],
    controllers: [BooksController]
})
export class BooksControllerModule {}