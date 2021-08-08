import { Test, TestingModule } from '@nestjs/testing';
import { BooksRepository } from '../../../src/repositories/books-repository';
import { createBookDto } from '../../utils/book-models-creator';
import { BooksServiceModule } from './books-service.module';


describe('BooksRepository', () => {
    let booksRepository: BooksRepository;
    const bookForAdding = createBookDto('123', 'new book', 'description', 'favorite', 'fileCover', 'fileName');
    const bookUpdates = createBookDto('', 'title updated', 'new description', '', 'file cover', 'file name');

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [BooksServiceModule]
        }).compile();
        booksRepository = module.get<BooksRepository>(BooksRepository);
    });

    it('BooksRepository - should be defined', () => {
        expect(booksRepository).toBeDefined();
    });

    describe('getAll', () => {
        it('Should retrieve empty list if no items were added', async () => {
            const expectedLength = 0;
            const items = await booksRepository.getAll();
            expect(items).not.toBeNull();
            expect(items.length).toEqual(expectedLength);
        });

        it('Should retrieve items amount of all added objects', async () => {
            await booksRepository.addBook(bookForAdding);
            const items = await booksRepository.getAll();
            expect(items.length).toEqual(1);
        });
    });

    describe('addBook', () => {
        it('Should retrieve added object', async () => {
            const added = await booksRepository.addBook(bookForAdding);
            expect(added).not.toBeNull();
        });
    });

    describe('getBookById', () => {
        it('Should retrieve object if item with passed id exists', async () => {
            await booksRepository.addBook(bookForAdding);
            const found = await booksRepository.getBookById(bookForAdding.id);
            expect(found).toBeDefined();
        });

        it('Should retrieve null if item with passed id doesn\'t exist', async () => {
            const found = await booksRepository.getBookById('-0000');
            expect(found).toBeNull();
        });
    });

    describe('deleteBook', () => {
        it('Should retrieve true if item was deleted', async () => {
            await booksRepository.addBook(bookForAdding);
            const wasDeleted = await booksRepository.deleteBook(bookForAdding.id);
            expect(wasDeleted).toBe(true);
        });

        it('Should retrieve false if item wasn\'t deleted', async () => {
            const wasDeleted = await booksRepository.deleteBook('-0000');
            expect(wasDeleted).toBe(false);
        });
    });

    describe('updateBook', () => {
        it('Should retrieve true if item was updated', async () => {
            await booksRepository.addBook(bookForAdding);
            const wasDeleted = await booksRepository.updateBook(bookForAdding.id, bookUpdates);
            expect(wasDeleted).toBe(true);
        });

        it('Should retrieve false if item wasn\'t updated', async () => {
            const wasUpdated = await booksRepository.updateBook('-0000', bookUpdates);
            expect(wasUpdated).toBe(false);
        });
    });
});

