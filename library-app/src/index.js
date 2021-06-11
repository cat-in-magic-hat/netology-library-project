const express = require('express');
const cors = require('cors');
const path = require('path');
const { booksApiRoutes, booksRoutes } = require(`./routes`);
const booksRepository = require('./data/books-repository');
const APP_PORT = process.env.PORT || 3000;

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

async function startApp() {
    try {
        await booksRepository.connect();
        app.listen(APP_PORT)
    } catch (e) {
        console.log(e);
    }
}
startApp()