const { Router } = require('express');
const booksRepository = require('../data/books-repository');
const saveFile = require('../middlewares/book-files-middleware');
const { ErrorResult, Book } = require('../models');
const { HTTP_STATUS_CODES } = require('../constants');
const { resolve } = require('path');

const booksApiRouter = new Router();

const notFoundResult = (res) => res.status(HTTP_STATUS_CODES.NOT_FOUND).json(new ErrorResult('Not found'));
const getFilePath = (req) => req.file ? req.file.path : null;

booksApiRouter.get(`/`, (req, res) => {
    const books = booksRepository.getAll();
    res.json(books);
});

booksApiRouter.get(`/:id`, (req, res) => {
    const { id } = req.params;
    const book = booksRepository.getById(id);
    if (book) {
        res.json(book);
    } else {
        notFoundResult(res);
    }
});
booksApiRouter.get(`/:id/download`, (req, res) => {
    const { id } = req.params;
    const book = booksRepository.getById(id);
    if (book && book.fileBook) {
        res.download(resolve(process.cwd(), book.fileBook));
    } else {
        notFoundResult(res);
    }
});

booksApiRouter.post(`/`, saveFile, (req, res) => {
    const book = new Book({
        ...req.body,
        fileBook: getFilePath(req)
    });
    booksRepository.addBook(book);
    res.status(HTTP_STATUS_CODES.CREATED).json(book);
});

booksApiRouter.put(`/:id`, saveFile, (req, res) => {
    const { id } = req.params;
    const updatedBook = booksRepository.updateBook(id, {
        ...req.body,
        fileBook: getFilePath(req)
    });
    if (updatedBook) {
        res.json(updatedBook);
    } else {
        notFoundResult(res);
    }
});

booksApiRouter.delete(`/:id`, (req, res) => {
    const { id } = req.params;
    const wasDeleted = booksRepository.removeBook(id);
    if (wasDeleted) res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
    else notFoundResult(res);
});
module.exports = booksApiRouter;