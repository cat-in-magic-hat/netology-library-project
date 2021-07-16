import uidGenerator from 'node-unique-id-generator';
import { Injectable } from '@nestjs/common';
import { Book } from '../models/book';

@Injectable()
export class BooksService {
    private books = new Map<string, Book>();

    public createBook(book: Book): void {
        const id = uidGenerator.generateUniqueId();
        this.books.set(id, {...book, id});
    }

    public getBook(id: string): Book | undefined {
        return this.books.get(id);
    }

    public getBooks(): Book[] {
        return [...this.books.values()];
    }

    public updateBook(id: string, book: Book): boolean {
        if(!this.books.has(id)) return false;
        const updated = { ...this.books.get(id), ...book, id };
        this.books.set(id, updated);
        return true;
    }

    public deleteBook(id: string): boolean {
        return this.books.delete(id);
    }
}