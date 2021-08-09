import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBooksService } from '../contracts/services';
import { BookDocument, Book } from '../models/db';
import { BookDto } from '../models/dto';
import { Injectable } from '@nestjs/common';

const SELECT_FIELDS = '-__v -_id';
@Injectable()
export class BooksService implements IBooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
    ){}

    public async getAll(): Promise<BookDocument[]> {
        return this.bookModel.find().select(SELECT_FIELDS);
    }

    public async getBookById(bookId: string): Promise<BookDocument | null> {
        return this.bookModel.findOne({ id: bookId }).select(SELECT_FIELDS);
    }

    public async addBook(bookDetails: BookDto): Promise<BookDocument> {
        const created = await new this.bookModel(bookDetails).save();
        const { _id, __v, ...book } = created;
        return book as BookDocument;
    }
    
    public async deleteBook(bookId: string): Promise<boolean> {
        const deletedBook = await this.bookModel.findOneAndDelete({ id: bookId });
        return deletedBook != null;
    }
    
    public async updateBook(bookId: string, bookDetails: BookDto): Promise<boolean> {
        const updatedBook = await this.bookModel.findOneAndUpdate({ id: bookId }, bookDetails);
        return updatedBook != null;
    }
}
