import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { counterRouter } from './routes/counter';
import { HTTP_STATUS_CODES } from './constants';

const app = express();

const APP_PORT = process.env.PORT || 3000;

app.use(`/counter`, counterRouter);
app.use((req: Request, res: Response) => {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
});

app.listen(APP_PORT);