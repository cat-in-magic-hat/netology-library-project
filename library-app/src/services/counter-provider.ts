import axios from 'axios';
import { injectable } from 'inversify';
import { ICounterProvider } from '../contracts/services';

const API_URL = process.env.COUNTER_API_URL || 'localhost:5000';
const buildIncrUrl = (bookId: string) => `${API_URL}/counter/${bookId}/incr`;

@injectable()
export class CounterProvider implements ICounterProvider {
    public incrementCounter(bookId: string): Promise<number> {
        const url = buildIncrUrl(bookId);
        return axios.post(url).then(res => res.data.amount);
    }
}