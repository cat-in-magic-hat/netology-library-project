import supertest from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BooksControllerModule } from './books-controller.module';
import { BooksRepository } from '../../../src/repositories/books-repository';
import { BookDto } from '../../../src/models/dto';
import { createBookDto } from '../../utils/book-models-creator';
import { TransformInterceptor } from '../../../src/infrasructure/interceptors';


describe('BooksController', () => {
    let app: INestApplication;
    const existingId = '1'.repeat(30);
    const notExistingId = '2'.repeat(30);
    const bookMock = createBookDto(existingId, 'new book', 'description', 'favorite', 'fileCover', 'fileName');
    const booksMock = [bookMock];
    const booksRepositoryMock = {
        getAll: () => booksMock,
        getBookById: (bookId: string) => booksMock.find(({id}) => bookId === id),
        addBook: (bookDetails: BookDto) => true,
        deleteBook: (bookId: string) => booksMock.some(({id}) => bookId === id),
        updateBook: (bookId: string, bookDetails: BookDto) => booksMock.some(({id}) => bookId === id),
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BooksControllerModule]
        }).overrideProvider(BooksRepository)
        .useValue(booksRepositoryMock)
        .overrideInterceptor(TransformInterceptor)
        .useValue(null)
        .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/GET books', () => {
        return supertest(app.getHttpServer())
            .get('/books')
            .expect(HttpStatus.OK)
            .expect(({body}) => body === booksRepositoryMock.getAll());
    });

    it('/GET books/:id (invalid id)', () => {
        return supertest(app.getHttpServer())
            .get(`/books/1`)
            .expect(HttpStatus.BAD_REQUEST);
    });

    it('/GET books/:id (existing)', () => {
        return supertest(app.getHttpServer())
            .get(`/books/${existingId}`)
            .expect(HttpStatus.OK)
            .expect(({body}) => body === booksRepositoryMock.getBookById(existingId));
    });

    it('/GET books/:id (not existing)', () => {
        return supertest(app.getHttpServer())
            .get(`/books/${notExistingId}`)
            .expect(HttpStatus.OK)
            .expect(({body}) => body === booksRepositoryMock.getBookById(existingId));
    });

    it('/POST books', () => {
        return supertest(app.getHttpServer())
            .post('/books')
            .send(bookMock)
            .expect(HttpStatus.NO_CONTENT);
    });

    it('/PUT book (not existing id)', () => {
        return supertest(app.getHttpServer())
            .put(`/books/${notExistingId}`)
            .expect(HttpStatus.NOT_FOUND);
    });

    it('/PUT book (existing id)', () => {
        return supertest(app.getHttpServer())
            .put(`/books/${existingId}`)
            .expect(HttpStatus.NO_CONTENT);
    });

    it('/DELETE book (not existing id)', () => {
        return supertest(app.getHttpServer())
            .delete(`/books/${notExistingId}`)
            .expect(HttpStatus.NOT_FOUND);
    });

    it('/DELETE book (existing id)', () => {
        return supertest(app.getHttpServer())
            .delete(`/books/${existingId}`)
            .expect(HttpStatus.NO_CONTENT);
    });

    afterAll(async () => {
        await app.close();
    });
});

