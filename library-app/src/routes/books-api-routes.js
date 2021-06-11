const { Router } = require('express');
const booksRepository = require('../data/books-repository');
const { ErrorResult } = require('../models');
const { HTTP_STATUS_CODES } = require('../constants');

const booksApiRouter = new Router();

const notFoundResult = (res) => res.status(HTTP_STATUS_CODES.NOT_FOUND).json(new ErrorResult('Not found'));
const generalErrorResult = (res) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(new ErrorResult('Internal server error'));

booksApiRouter.get(`/`, async (req, res) => {
    try {
        const books = await booksRepository.getAll();
        res.json(books);
    } catch (err) {
        generalErrorResult(res);
    }    
});

booksApiRouter.get(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksRepository.getBookById(id);
        if (book) {
            res.json(book);
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

booksApiRouter.post(`/`, async (req, res) => {
    try {
        await booksRepository.addBook({ ...req.body });
        res.sendStatus(HTTP_STATUS_CODES.CREATED);
    } catch (err) {
        generalErrorResult(res);
    }
});

booksApiRouter.put(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const wasUpdated = await booksRepository.updateBook(id, { ...req.body });
        if (wasUpdated) {
            res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
        } else {
            notFoundResult(res);
        }
    } catch (err) {
        generalErrorResult(res);
    }
});

booksApiRouter.delete(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await booksRepository.deleteBook(id);
        if (wasDeleted) res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
        else notFoundResult(res);
    } catch (err) {
        generalErrorResult(res);
    }
});
module.exports = booksApiRouter;