import { injectable } from 'inversify';
import redis, { RedisClient } from 'redis';
import { ICounterProvider } from '../contracts';

const STORAGE_URL = process.env.STORAGE_URL || 'localhost';

@injectable()
export class CounterProvider implements ICounterProvider {
    private readonly client: RedisClient;

    constructor() {
        this.client = redis.createClient(`redis://${STORAGE_URL}`);
        this.client.on('error', error => {
            console.log('Redis error detected');
            console.log(error);
        });
    }

    public getCounterById(key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) reject(err);
                else resolve(Number(reply) || 0);
            })
        })
    }

    public incrementCounter(key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.client.incr(key, (err, reply) => {
                if (err) reject(err);
                else resolve(reply);
            })
        })
    }
}
