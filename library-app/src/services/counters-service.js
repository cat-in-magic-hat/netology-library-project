const axios = require('axios').default;
const { HTTP_STATUS_CODES } = require('../constants');

const API_URL = process.env.COUNTER_API_URL || 'localhost:5000';
const buildIncrUrl = bookId => `${API_URL}/counter/${bookId}/incr`;

const incrementCounter = bookId => {
    const url = buildIncrUrl(bookId);
    return axios.post(url).then(res => res.data.amount);
}

module.exports = {
    incrementCounter
}