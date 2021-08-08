import { BookDto } from '../../src/models/dto';

export const createBookDto = (id: string,
    title: string,
    description: string,
    favorite: string,
    fileCover: string,
    fileName: string) =>
{
    const book = new BookDto();
    book.id = id;
    book.title = title;
    book.description = description;
    book.favorite = favorite;
    book.fileCover = fileCover;
    book.fileName = fileName;
    return book;
};