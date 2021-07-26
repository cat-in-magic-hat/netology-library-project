import { Get, Controller, Param, UseInterceptors, Post, Put, Delete, Body, HttpCode, Res, HttpStatus, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from '../infrasructure/filters';
import { NotFoundInterceptor, TransformInterceptor } from '../infrasructure/interceptors';
import { BookIdValidationPipe } from '../infrasructure/pipes';
import { BookDto } from '../models/dto';
import { BooksRepository } from '../repositories/books-repository';

@Controller("books")
@UseInterceptors(TransformInterceptor)
export class BooksController {
  constructor(private readonly booksRepository: BooksRepository) {}

  @Get()
  async getAllBooks(): Promise<BookDto[]> {
    return await this.booksRepository.getAll();
  }

  @Get(":id")
  @UseInterceptors(NotFoundInterceptor)
  async getBook(@Param('id', new BookIdValidationPipe()) id: string): Promise<BookDto | null> {
    return await this.booksRepository.getBookById(id);
  }

  @Post()
  @HttpCode(204)
  async createBook(@Body() book: BookDto): Promise<void> {
    await this.booksRepository.addBook(book);
  }

  @Put(":id")
  async updateBook(
    @Param('id', new BookIdValidationPipe()) id: string,
    @Body() book: BookDto,
    @Res() res: Response): Promise<void>
  {
    const wasUpdated = await this.booksRepository.updateBook(id, book);
    res.status(wasUpdated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND).send();
  }

  @Delete(":id")
  @UseFilters(HttpExceptionFilter)
  async deleteBook(
    @Param('id', new BookIdValidationPipe()) id: string,
    @Res() res: Response): Promise<void>
  {
    const wasDeleted = await this.booksRepository.deleteBook(id);
    res.status(wasDeleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND).send();
  }
}
