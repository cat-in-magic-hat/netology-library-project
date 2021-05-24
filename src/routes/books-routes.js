const { Router } = require('express');
const booksRepository = require('../data/books-repository');
const { ErrorResult, Book } = require('../models');
const { HTTP_STATUS_CODES } = require('../constants');

const booksRouter = new Router();

const notFoundResult = (res) => res.status(HTTP_STATUS_CODES.NOT_FOUND).json(new ErrorResult('Not found'));

booksRouter.get(`/`, (req, res) => {
    const books = booksRepository.getAll();
    res.json(books);
});

booksRouter.get(`/:id`, (req, res) => {
    const { id } = req.params;
    const book = booksRepository.getById(id);
    if (book) {
        res.json(book);
    } else {
        notFoundResult(res);
    }
});

booksRouter.post(`/`, (req, res) => {
    const book = new Book(req.body);
    booksRepository.addBook(book);
    res.status(HTTP_STATUS_CODES.CREATED).json(book);
});

booksRouter.put(`/:id`, (req, res) => {
    const { id } = req.params;
    const bookData = req.body;
    const updatedBook = booksRepository.updateBook(id, bookData);
    if (updatedBook) {
        res.json(updatedBook);
    } else {
        notFoundResult(res);
    }
});

booksRouter.delete(`/:id`, (req, res) => {
    const { id } = req.params;
    const wasDeleted = booksRepository.removeBook(id);
    if (wasDeleted) res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
    else notFoundResult(res);
});
module.exports = booksRouter;