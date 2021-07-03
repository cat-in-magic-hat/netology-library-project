const { Router } = require('express');
const { getCounterById, incrementCounter } = require('../data/counter-provider');
const { HTTP_STATUS_CODES } = require('../constants');

const counterRouter = new Router();

const logSuccess = (id, amount) => console.info(`Book '${id}' was requested ${amount} times`);
const logError = (id, err) => console.error(`Attempt to perform operation on book '${id}' failed. Error: '${err}'`);
const sendResult = (response, id, amount) => response.json({ id, amount });

counterRouter.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        const amount = await getCounterById(bookId);
        sendResult(res, bookId, amount);
        logSuccess(bookId, amount);
    } catch (err) {
        logError(bookId, err);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
});

counterRouter.post('/:bookId/incr', async (req, res) => {
    const { bookId } = req.params;
    try {
        const amount = await incrementCounter(bookId);
        sendResult(res, bookId, amount);
        logSuccess(bookId, amount);
    } catch (err) {
        logError(bookId, err);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
});

module.exports = counterRouter;