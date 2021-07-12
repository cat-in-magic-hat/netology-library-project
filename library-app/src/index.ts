import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { booksApiRouter, booksRouter } from './routes';
import { container } from './configuration/ioc-config';
import { IDbConnector } from './contracts/services';
import { SERVICE_IDENTIFIER } from './constants';
import { ISocketConfigurator } from './contracts/services/socket-configurator';

const APP_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');
app.get('/', (req: Request, res: Response) => {
    res.render("index", {
        title: 'Библиотека'
    })
})
app.use(`/books`, booksRouter);
app.use(`/api/books`, booksApiRouter);

app.use('/500', (req: Request, res: Response) => {
    res.render("error/general-error", {
        title: 'Ошибка сервера'
    })
});
app.use((req: Request, res: Response) => {    
    res.render("error/general-error", {
        title: 'Страница не найдена'
    })
});

const server = container.get<ISocketConfigurator>(SERVICE_IDENTIFIER.SOCKET_CONFIGURATOR).configure(app);
async function startApp() {
    try {
        await container.get<IDbConnector>(SERVICE_IDENTIFIER.DB_CONNECTOR).connect();
        server.listen(APP_PORT)
    } catch (e) {
        console.log(e);
    }
}
startApp()