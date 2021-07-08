require("reflect-metadata");
const express = require('express');
const cors = require('cors');
const path = require('path');
const { booksApiRoutes, booksRoutes } = require(`./routes`);
const { container } = require('./configuration/ioc-config');
const { configureSocket } = require('./sockets');
const { BooksRepository } = require('./data/books-repository');
const APP_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, './public')));
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

app.use('/500', (req, res) => {
    res.render("error/general-error", {
        title: 'Ошибка сервера'
    })
});
app.use((req, res) => {    
    res.render("error/general-error", {
        title: 'Страница не найдена'
    })
});

const server = configureSocket(app);
async function startApp() {
    try {
        await container.get(BooksRepository).connect();
        server.listen(APP_PORT)
    } catch (e) {
        console.log(e);
    }
}
startApp()