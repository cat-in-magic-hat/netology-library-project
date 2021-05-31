const express = require('express');
const cors = require('cors');
const path = require('path');
const { userApiRoutes, booksApiRoutes, booksRoutes } = require(`./routes`);

const booksRepository = require('./data/books-repository');
const { books } = require('./data/fake/initial-data');
const APP_PORT = process.env.PORT || 3000;

const setInitialData = () => {
    (books || []).forEach(x => booksRepository.addBook(x));
}

setInitialData();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render("index", {
        title: 'Библиотека'
    })
})
app.use(`/books`, booksRoutes);
app.use(`/api/books`, booksApiRoutes);
app.use(`/api/user`, userApiRoutes);

app.use((req, res) => {
    res.render("error/404", {
        title: 'Страница не найдена'
    })
});
app.listen(APP_PORT);
