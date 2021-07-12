import axios from 'axios';

const API_URL = process.env.COUNTER_API_URL || 'localhost:5000';
const buildIncrUrl = (bookId: string) => `${API_URL}/counter/${bookId}/incr`;

export const incrementCounter = (bookId: string) => {
    const url = buildIncrUrl(bookId);
    return axios.post(url).then(res => res.data.amount);
}