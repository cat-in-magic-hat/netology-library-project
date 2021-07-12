export interface ICounterProvider {
    incrementCounter: (key: string) => Promise<number>;
}