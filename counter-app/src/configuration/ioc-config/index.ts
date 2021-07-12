import 'reflect-metadata';
import { Container } from 'inversify';
import { CounterProvider } from '../../data/counter-provider';
import { ICounterProvider } from '../../contracts';
import { SERVICE_IDENTIFIER } from '../../constants';
export const container = new Container();

container.bind<ICounterProvider>(SERVICE_IDENTIFIER.COUNTER_SERVICE).to(CounterProvider);
