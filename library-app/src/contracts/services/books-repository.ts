import { IBook, IComment } from '../models';
import mongoose from 'mongoose';

export interface IBooksRepository {
    getAll: () => Promise<IBook[]>;
    getBookById: (bookId: string) => Promise<IBook | null>;
    addBook: (bookDetails: IBook) => Promise<IBook>; 
    deleteBook: (bookId: string) => Promise<boolean>;
    updateBook: (bookId: string, bookDetails: IBook) => Promise<boolean>; 
    addComment: (bookId: string, comment: IComment) => Promise<IComment | null>; 
    getComments: (bookId: string) => Promise<IComment[]>;
    connect: () => Promise<typeof mongoose>;
}