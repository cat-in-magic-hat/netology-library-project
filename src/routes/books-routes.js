const { Router } = require('express');
const booksRepository = require('../data/books-repository');
const saveFile = require('../middlewares/book-files-middleware');
const { Book } = require('../models');
const { HTTP_STATUS_CODES } = require('../constants');

const booksRouter = new Router();
const BOOKS_LIST_URL = '/books';

const notFoundResult = (res) => res.status(HTTP_STATUS_CODES.NOT_FOUND).redirect('/404');
const getFilePath = (req) => req.file ? req.file.path : null;
const redirectToList = (res) => res.redirect(BOOKS_LIST_URL);
const redirectToItem = (res, id) => res.redirect(`${BOOKS_LIST_URL}/${id}`);

booksRouter.get('/', (req, res) => {
    const books = booksRepository.getAll();
    res.render('books/index', {
        title: 'Библиотека',
        books
    });
});

booksRouter.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: {}
    });
});


booksRouter.post('/create', saveFile, (req, res) => {
    const book = new Book({
        ...req.body,
        fileBook: getFilePath(req)
    });
    booksRepository.addBook(book);
    redirectToList(res);
});

booksRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = booksRepository.getById(id);
    if (book) {
        res.render('books/view', {
            title: `Книга '${book.title}'`,
            book
        });
    } else {
        notFoundResult(res);
    }
});

booksRouter.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const book = booksRepository.getById(id);
    if (book) {
        res.render('books/update', {
            title: `Книга '${book.title}'`,
            book
        });
    } else {
        notFoundResult(res);
    }
});

booksRouter.post('/update/:id', saveFile, (req, res) => {
    const { id } = req.params;
    const updatedBook = booksRepository.updateBook(id, {
        ...req.body,
        fileBook: getFilePath(req)
    });
    if (updatedBook) {
        redirectToItem(res, id);
    } else {
        notFoundResult(res);
    }
});

booksRouter.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const wasDeleted = booksRepository.removeBook(id);
    if (wasDeleted) {
        redirectToList(res);
    } else {
        notFoundResult(res);
    }
});

module.exports = booksRouter;