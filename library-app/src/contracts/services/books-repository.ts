import { IBook, IComment } from "../models";
import mongoose from "mongoose";

export interface IBooksRepository {
    getAll: () => IBook[];
    getBookById: (bookId: number) => IBook;
    addBook: (bookDetails: IBook) => Promise<IBook>; 
    deleteBook: (bookId: number) => Promise<boolean>;
    updateBook: (bookId: number, bookDetails: IBook) => Promise<boolean>; 
    addComment: (bookId: number, comment: IComment) => Promise<IComment>; 
    getComments: (bookId: number) => Promise<IComment[]>;
    connect: () => Promise<typeof mongoose>;
}