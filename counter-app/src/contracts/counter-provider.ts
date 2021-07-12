export interface ICounterProvider {
    getCounterById: (key: string) => Promise<number>;
    incrementCounter: (key: string) => Promise<number>;
}