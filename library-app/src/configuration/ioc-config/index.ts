import "reflect-metadata";
import { Container } from "inversify";
import { BooksRepository } from "../../data/books-repository";
const container = new Container();

container.bind(BooksRepository).toSelf();

export {
    container
};