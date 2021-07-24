import { BookDocument } from '../../models/db';
import { BookDto } from '../../models/dto';

export interface IBooksRepository {
    getAll: () => Promise<BookDocument[]>;
    getBookById: (bookId: string) => Promise<BookDocument | null>;
    addBook: (bookDetails: BookDto) => Promise<BookDocument>; 
    deleteBook: (bookId: string) => Promise<boolean>;
    updateBook: (bookId: string, bookDetails: BookDto) => Promise<boolean>;
}