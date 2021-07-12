import { Router, Request, Response } from 'express';
import { container } from '../configuration/ioc-config';
import { SERVICE_IDENTIFIER } from '../constants';
import { HTTP_STATUS_CODES } from '../constants';
import { ICounterProvider } from '../contracts';

export const counterRouter = Router();

const logSuccess = (id: string, amount: number) => console.info(`Book '${id}' was requested ${amount} times`);
const logError = (id: string, err: Error) => console.error(`Attempt to perform operation on book '${id}' failed. Error: '${err}'`);
const sendResult = (response: Response, id: string, amount: number) => response.json({ id, amount });

const counterService = container.get<ICounterProvider>(SERVICE_IDENTIFIER.COUNTER_SERVICE);

counterRouter.get('/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    try {
        const amount = await counterService.getCounterById(bookId);
        sendResult(res, bookId, amount);
        logSuccess(bookId, amount);
    } catch (err) {
        logError(bookId, err);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
});

counterRouter.post('/:bookId/incr', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    try {
        const amount = await counterService.incrementCounter(bookId);
        sendResult(res, bookId, amount);
        logSuccess(bookId, amount);
    } catch (err) {
        logError(bookId, err);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
});