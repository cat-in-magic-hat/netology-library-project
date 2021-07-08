import { injectable } from "inversify";
import mongoose from "mongoose";

import { IBook, IComment } from "../contracts/models";
import { IBooksRepository } from "../contracts/services";
import { Book, BookComment } from "../models";
import { BOOKS_DB_SETTINGS } from "../constants";

const SELECT_FIELDS = '-__v -_id';
@injectable()
export class BooksRepository implements IBooksRepository {
    public getAll(): IBook[] {
        return Book.find().select(SELECT_FIELDS);
    }

    public getBookById(bookId: number): IBook {
        return Book.findOne({ id: bookId }).select(SELECT_FIELDS);
    }

    public async addBook(bookDetails: IBook): Promise<IBook> {
        const created = await new Book(bookDetails).save();
        const { _id, __v, ...book } = created._doc;
        return book;
    }
    
    public async deleteBook(bookId: number): Promise<boolean> {
        const deletedBook = await Book.findOneAndDelete({ id: bookId });
        return deletedBook != null;
    }
    
    public async updateBook(bookId: number, bookDetails: IBook): Promise<boolean> {
        const updatedBook = await Book.findOneAndUpdate({ id: bookId }, bookDetails);
        return updatedBook != null;
    }
    
    public async addComment(bookId: number, comment: IComment): Promise<IComment> {
        const book = await Book.findOne({ id: bookId });
        if (book) {
            const dbComment = await new BookComment({ ...comment, bookId: book._id }).save();
            const { _doc: { _id, __v, ...result } } = dbComment;
            return result;
        }
        return null;
    }
    
    public async getComments(bookId: number): Promise<IComment[]> {
        const book = await Book.findOne({ id: bookId });
        return book
            ? await BookComment.find({ bookId: book._id }).select(SELECT_FIELDS)
            : null;
    }
    
    public connect(): Promise<typeof mongoose> {
        return mongoose.connect(BOOKS_DB_SETTINGS.connectionString, { useFindAndModify: false, useNewUrlParser: true });
    }
}