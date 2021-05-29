const express = require('express');
const cors = require('cors');
const { userRoutes, booksRoutes } = require(`./routes`);

const booksRepository = require('./data/books-repository');
const { books } = require('./data/fake/initial-data');
const { HTTP_STATUS_CODES } = require('./constants');
const { ErrorResult } = require('./models');

const APP_PORT = process.env.PORT || 3000;

const setInitialData = () => {
    (books || []).forEach(x => booksRepository.addBook(x));
}

setInitialData();

const app = express();
app.use(cors());
app.use(`/api/user`, userRoutes);
app.use(`/api/books`, booksRoutes);
app.use((req, res) => {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorResult('Method doesn\'t exist'));
});
app.listen(APP_PORT);
