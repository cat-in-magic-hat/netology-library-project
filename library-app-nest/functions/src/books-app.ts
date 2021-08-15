import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const app = express();
const getBookFromRequestBody = (request: express.Request) => {
  const {
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
  } = request.body;
  return {
    title, description, authors, favorite, fileCover, fileName,
  };
};

app.get('/', async (req, res) => {
  const result = (await admin.database().ref('/books').once('value')).val();
  const books = Object.entries(result)
      .map(([key, value]) => ({...<any>value, id: key}));
  res.send(books);
});

app.get('/:id', async (req, res) => {
  const bookId = req.params.id;
  const book = (await admin.database().ref(`/books/${bookId}`).once('value'))
      .val();
  if (book) {
    res.send({...book, id: bookId});
  } else {
    res.sendStatus(404);
  }
});

app.post('/', async (req, res) => {
  const book = getBookFromRequestBody(req);
  const created = await admin.database().ref('/books').push(book);
  const createdVal = (await created.once('value')).val();
  res.status(201).send({...createdVal, id: created.key});
});

app.put('/:id', async (req, res) => {
  const bookId = req.params.id;
  const book = getBookFromRequestBody(req);
  const ref = await admin.database().ref(`/books/${bookId}`);
  const existingItem = (await ref.once('value')).val();
  if (!existingItem) {
    res.sendStatus(404);
  } else {
    await ref.update(book);
    res.sendStatus(204);
  }
});

app.delete('/:id', async (req, res) => {
  const bookId = req.params.id;
  await admin.database().ref(`/books/${bookId}`).remove();
  res.sendStatus(204);
});

export const booksApp = app;
