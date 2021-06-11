const { Book, BookComment } = require("../models");
const mongoose = require('mongoose');
const { BOOKS_DB_SETTINGS } = require('../constants');

const SELECT_FIELDS = '-__v -_id';

const getAll = () => Book.find().select(SELECT_FIELDS);
const getBookById = (bookId) => {
    return Book.findOne({ id: bookId }).select(SELECT_FIELDS);
}

const addBook = async (bookDetails) => {
    const created = await new Book(bookDetails).save();
    const { _id, __v, ...book } = created._doc;
    return book;
}

const deleteBook = async (bookId) => {
    const deletedBook = await Book.findOneAndDelete({ id: bookId });
    return deletedBook != null;
}

const updateBook = async (bookId, bookDetails) => {
    const updatedBook = await Book.findOneAndUpdate({ id: bookId }, bookDetails);
    return updatedBook != null;
}

const addComment = async (bookId, comment) => {
    const book = await Book.findOne({ id: bookId });
    if (book) {
        const dbComment = await new BookComment({ ...comment, bookId: book._id }).save();
        const { _doc: { _id, __v, ...result } } = dbComment;
        return result;
    }
    return null;
}

const getComments = async (bookId) => {
    const book = await Book.findOne({ id: bookId });
    return book
        ? await BookComment.find({ bookId: book._id }).select(SELECT_FIELDS)
        : null;
}

const connect = () => mongoose.connect(BOOKS_DB_SETTINGS.connectionString, { useFindAndModify: false });

module.exports = {
    connect,
    getAll,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    addComment,
    getComments
};