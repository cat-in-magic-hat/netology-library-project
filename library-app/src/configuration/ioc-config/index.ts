import { Container } from 'inversify';
import { BooksRepository } from '../../data';
import { SERVICE_IDENTIFIER } from '../../constants';
import { IBooksRepository, ICounterProvider, IDbConnector } from '../../contracts/services';
import { CounterProvider, SocketConfigurator } from '../../services';
import { ISocketConfigurator } from '../../contracts/services/socket-configurator';
export const container = new Container();

container.bind<IBooksRepository>(SERVICE_IDENTIFIER.BOOKS_REPOSITORY).to(BooksRepository);
container.bind<ICounterProvider>(SERVICE_IDENTIFIER.COUNTER_PROVIDER).to(CounterProvider);
container.bind<IDbConnector>(SERVICE_IDENTIFIER.DB_CONNECTOR).to(BooksRepository);
container.bind<ISocketConfigurator>(SERVICE_IDENTIFIER.SOCKET_CONFIGURATOR).to(SocketConfigurator);
