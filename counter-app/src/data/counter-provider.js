const redis = require('redis');

const STORAGE_URL = process.env.STORAGE_URL || 'localhost';
const client = redis.createClient(`redis://${STORAGE_URL}`);

const getCounterById = key => new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
        if (err) reject(err);
        else resolve(reply || 0);
    })
})

const incrementCounter = key => new Promise((resolve, reject) => {
    client.incr(key, (err, reply) => {
        if (err) reject(err);
        else resolve(reply);
    })
})

module.exports = {
    getCounterById,
    incrementCounter
};
