import { IBooksRepository } from '../contracts';
import { BookDto } from '../models/dto';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class BooksRepository implements IBooksRepository {
    private db: admin.database.Database;

    constructor(){
        this.db = admin.database();
    }

    public async getAll(): Promise<BookDto[]> {
        const booksObj = (await this.db.ref("books").once('value')).val();
        return Object.entries(booksObj)
            .map(([key, value]) => (<BookDto>{ ...<any>value, id: key }));
    }

    public async getBookById(bookId: string): Promise<BookDto | null> {
        const obj = (await this.db.ref("books").child(bookId).once('value')).val();
        return obj ? {...obj, id: bookId } : null;
    }

    public async addBook(bookDetails: BookDto): Promise<BookDto> {
        const created = await this.db.ref("books").push(bookDetails);
        const createdVal = (await created.once('value')).val();   
        return { ...createdVal, id: created.key };
    }
    
    public async deleteBook(bookId: string): Promise<boolean> {
        try {
            const ref = await this.db.ref("books").child(bookId);
            const existingItem = (await ref.once('value')).val();
            if(!existingItem) return false;
            await ref.remove();
            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }
    
    public async updateBook(bookId: string, bookDetails: BookDto): Promise<boolean> {
        try {
            const ref = await this.db.ref("books").child(bookId);
            const existingItem = (await ref.once('value')).val();
            if(!existingItem) return false;
            await ref.update(bookDetails);
            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }
}
