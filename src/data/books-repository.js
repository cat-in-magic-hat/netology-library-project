const { Book } = require("../models");

class BooksRepository {
    books = [];

    getById(bookId) {
        return this.books.find(({id }) => id === bookId);
    }

    getAll() {
        return [...this.books];
    }

    addBook(bookDetails) {
        this.books.push(new Book(bookDetails));
    }
    
    removeBook(bookId) {
        const bookForDeletingIdx = this.books.findIndex(({ id }) => id === bookId);
        if (bookForDeletingIdx > -1) {
            this.books.splice(bookForDeletingIdx, 1);
            return true;
        } else {
            return false;
        }
    }

    updateBook(bookId, bookDetails) {
        const bookForUpdatingIdx = this.books.findIndex(({ id }) => id === bookId);
        if (bookForUpdatingIdx > -1) {
            const newBook = new Book({...this.books[bookForUpdatingIdx], ...bookDetails, id: bookId})
            this.books[bookForUpdatingIdx] = newBook;
            return newBook;
        } else {
            return null;
        }
    }
}

const repository = new BooksRepository();
module.exports = repository;