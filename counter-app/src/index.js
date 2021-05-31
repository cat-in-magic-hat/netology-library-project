const express = require('express');
const counterRouter = require(`./routes/counter`);
const { HTTP_STATUS_CODES } = require('./constants');

const app = express();

const APP_PORT = process.env.PORT || 3000;

app.use(`/counter`, counterRouter);
app.use((req, res) => {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
});

app.listen(APP_PORT);