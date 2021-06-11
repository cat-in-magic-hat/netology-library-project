const { Router } = require('express');
const booksRepository = require('../data/books-repository');
const { HTTP_STATUS_CODES } = require('../constants');
const { incrementCounter } = require('../services/counters-service');

const booksRouter = new Router();
const BOOKS_LIST_URL = '/books';

const notFoundResult = (res) => res.status(HTTP_STATUS_CODES.NOT_FOUND).redirect('/404');
const generalErrorResult = (res) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).redirect('/500');
const redirectToList = (res) => res.redirect(BOOKS_LIST_URL);
const redirectToItem = (res, id) => res.redirect(`${BOOKS_LIST_URL}/${id}`);

booksRouter.get('/', async (req, res) => {
    try {
        const books = await booksRepository.getAll();
        res.render('books/index', {
            title: 'Библиотека',
            books
        });
    } catch (err) {
        generalErrorResult(res);
    }
});

booksRouter.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: {}
    });
});


booksRouter.post('/create', async (req, res) => {
    try {
        await booksRepository.addBook({ ...req.body });
    } catch (err) {
        console.error(err);
    }
    redirectToList(res);
});

booksRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksRepository.getBookById(id);
        if (book) {
            let viewsAmount, comments;
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

booksRouter.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksRepository.getBookById(id);
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

booksRouter.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const wasUpdated = await booksRepository.updateBook(id, { ...req.body });
    if (wasUpdated) {
        redirectToItem(res, id);
    } else {
        notFoundResult(res);
    }
});

booksRouter.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await booksRepository.deleteBook(id);
        if (wasDeleted) {
            redirectToList(res);
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

module.exports = booksRouter;