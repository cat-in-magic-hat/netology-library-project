import { BookDto } from '../models/dto';

export interface IBooksRepository {
    getAll: () => Promise<BookDto[]>;
    getBookById: (bookId: string) => Promise<BookDto | null>;
    addBook: (bookDetails: BookDto) => Promise<BookDto>; 
    deleteBook: (bookId: string) => Promise<boolean>;
    updateBook: (bookId: string, bookDetails: BookDto) => Promise<boolean>;
}