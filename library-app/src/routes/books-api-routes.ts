import { Router, Request, Response } from 'express';
import { ErrorResult } from '../models';
import { HTTP_STATUS_CODES } from '../constants';
import { container } from '../configuration/ioc-config';
import { BooksRepository } from '../data/books-repository';

export const booksApiRouter = Router();

const notFoundResult = (res: Response) => res.status(HTTP_STATUS_CODES.NOT_FOUND).json(new ErrorResult('Not found'));
const generalErrorResult = (res: Response) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(new ErrorResult('Internal server error'));

const getBooksRepository = () => container.get(BooksRepository);
booksApiRouter.get(`/`, async (req: Request, res: Response) => {
    try {
        const books = await getBooksRepository().getAll();
        res.json(books);
    } catch (err) {
        generalErrorResult(res);
    }    
});

booksApiRouter.get(`/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await getBooksRepository().getBookById(id);
        if (book) {
            res.json(book);
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

booksApiRouter.post(`/`, async (req: Request, res: Response) => {
    try {
        const book = await getBooksRepository().addBook({ ...req.body });
        res.json(book);
    } catch (err) {
        generalErrorResult(res);
    }
});

booksApiRouter.put(`/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const wasUpdated = await getBooksRepository().updateBook(id, { ...req.body });
        if (wasUpdated) {
            res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

booksApiRouter.delete(`/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const wasDeleted = await getBooksRepository().deleteBook(id);
        if (wasDeleted) res.sendStatus(HTTP_STATUS_CODES.OK);
        else notFoundResult(res);
    } catch (err) {
        generalErrorResult(res);
    }
});