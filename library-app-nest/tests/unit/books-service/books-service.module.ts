import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from '../../../src/models/db';
import { BookDto } from '../../../src/models/dto';
import { BooksRepository } from '../../../src/repositories/books-repository';

class Selectable<T> {
    constructor(private items: T | null){}
    select = () => this.items;
}

export class BooksModelMock {
    private bookDetailsForSaving: Book | null;

    constructor(bookDetails: BookDto) {
        this.bookDetailsForSaving = { ...bookDetails };
    }

    public static items: Book[] = [];

    public static find = () => new Selectable<Book[]>([...BooksModelMock.items]);
    
    public static findOne = (filter: { id: string }) => new Selectable<Book>(BooksModelMock.items.find(({ id }) => filter.id === id) || null);

    public save = () => {
        const toBeSaved = this.bookDetailsForSaving;
        if (toBeSaved) {
            BooksModelMock.items.push(toBeSaved);
            this.bookDetailsForSaving = null;
        }
        return toBeSaved; 
    }

    public static findOneAndDelete = (filter: { id: string }) => {
        const found = BooksModelMock.items.find(({ id }) => filter.id === id);
        if (found) BooksModelMock.items = BooksModelMock.items.filter(x => x !== found);
        return found;
    }

    public static findOneAndUpdate = (filter: { id: string }, fields: BookDto) => {
        const foundIdx = BooksModelMock.items.findIndex(({ id }) => filter.id === id);
        if (foundIdx > -1) {
            BooksModelMock.items[foundIdx] = { ...BooksModelMock.items[foundIdx], ...fields, id: filter.id };
            return BooksModelMock.items[foundIdx];
        }
        return null;
    }
}

@Module({
    providers: [
        BooksRepository,
        {
            provide: getModelToken(Book.name),
            useValue: BooksModelMock,
        },
    ],
})
export class BooksServiceModule {}