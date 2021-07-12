import { Router, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants';
import { incrementCounter } from '../services/counters-service';
import { container } from '../configuration/ioc-config';
import { BooksRepository } from '../data/books-repository';
import { IComment } from '../contracts/models';

export const booksRouter = Router();
const BOOKS_LIST_URL = '/books';

const notFoundResult = (res: Response) => res.status(HTTP_STATUS_CODES.NOT_FOUND).redirect('/404');
const generalErrorResult = (res: Response) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).redirect('/500');
const redirectToList = (res: Response) => res.redirect(BOOKS_LIST_URL);
const redirectToItem = (res: Response, id: string) => res.redirect(`${BOOKS_LIST_URL}/${id}`);

const getBooksRepository = () => container.get(BooksRepository);

booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await getBooksRepository().getAll();
        res.render('books/index', {
            title: 'Библиотека',
            books
        });
    } catch (err) {
        generalErrorResult(res);
    }
});

booksRouter.get('/create', (req: Request, res: Response) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: {}
    });
});


booksRouter.post('/create', async (req: Request, res: Response) => {
    try {
        await getBooksRepository().addBook({ ...req.body });
    } catch (err) {
        console.error(err);
    }
    redirectToList(res);
});

booksRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const booksRepository = getBooksRepository();
    try {
        const book = await booksRepository.getBookById(id);
        if (book) {
            let viewsAmount: number = 0, comments: IComment[] = [];
            try {
                viewsAmount = await incrementCounter(id);
            } catch (err) {
                console.error(`Attempt to increment views amount for book '${id}' failed.`);
                console.error(err);
            }
            try {
                comments = await booksRepository.getComments(id);
            } catch (err) {
                console.error(`Attempt to get comments for book '${id}' failed.`);
                console.error(err);
            }
            res.render('books/view', {
                title: `Книга '${book.title}'`,
                book,
                viewsAmount,
                comments,
                useSocketConnection: true
            });
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

booksRouter.get('/update/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await getBooksRepository().getBookById(id);
        if (book) {
            res.render('books/update', {
                title: `Книга '${book.title}'`,
                book
            });
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

booksRouter.post('/update/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const wasUpdated = await getBooksRepository().updateBook(id, { ...req.body });
    if (wasUpdated) {
        redirectToItem(res, id);
    } else {
        notFoundResult(res);
    }
});

booksRouter.post('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const wasDeleted = await getBooksRepository().deleteBook(id);
        if (wasDeleted) {
            redirectToList(res);
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});