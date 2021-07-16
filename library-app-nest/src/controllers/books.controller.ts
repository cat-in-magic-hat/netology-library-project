import { Get, Controller, Param, UseInterceptors, Post, Put, Delete, Body, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundInterceptor } from '../interceptors/not-found-interceptor';
import { Book } from '../models/book';
import { BooksService } from '../services/books-service';

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getBooks();
  }

  @Get(":id")
  @UseInterceptors(NotFoundInterceptor)
  getBook(@Param('id') id: string): Book | undefined {
    return this.booksService.getBook(id);
  }

  @Post()
  @HttpCode(204)
  createBook(@Body() book: Book): void {
    this.booksService.createBook(book);
  }

  @Put(":id")
  updateBook(@Param('id') id: string, @Body() book: Book, @Res() res: Response): void {
    const wasUpdated = this.booksService.updateBook(id, book);
    res.status(wasUpdated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND).send();
  }

  @Delete(":id")
  deleteBook(@Param('id') id: string, @Res() res: Response): void {
    const wasDeleted = this.booksService.deleteBook(id);
    res.status(wasDeleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND).send();
  }
}
