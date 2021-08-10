import { Get, Controller, Param, UseInterceptors, Post, Put, Delete, Body, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundInterceptor } from '../interceptors/not-found-interceptor';
import { BookDto } from '../models/dto';
import { BooksRepository } from '../services/books-service';

@Controller("books")
export class BooksController {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Get()
  async getAllBooks(): Promise<BookDto[]> {
    return await this.booksRepository.getAll() || [];
  }

  @Get(":id")
  @UseInterceptors(NotFoundInterceptor)
  async getBook(@Param('id') id: string): Promise<BookDto | null> {
    return await this.booksRepository.getBookById(id);
  }

  @Post()
  async createBook(@Body() book: BookDto): Promise<BookDto> {
    return await this.booksRepository.addBook(book);
  }

  @Put(":id")
  async updateBook(@Param('id') id: string, @Body() book: BookDto, @Res() res: Response): Promise<void> {
    const wasUpdated = await this.booksRepository.updateBook(id, book);
    res.status(wasUpdated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND).send();
  }

  @Delete(":id")
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.booksRepository.deleteBook(id);
  }
}
