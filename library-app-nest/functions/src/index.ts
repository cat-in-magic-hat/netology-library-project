import * as functions from 'firebase-functions';
// import * as express from 'express';
import { moderator } from './moderator';
import { booksApp } from './books-app';
// const admin = require('firebase-admin');
// admin.initializeApp();

// const app = express();
// app.get('/', async (req, res) => {
//     const result = await admin.database().ref('/books').once('value');
//     res.send(result);
// });
// app.get('/:id', async (req, res) => {
//     const bookId = req.params.id;
//     const result = await admin.database().ref(`/books/${bookId}`);
//     functions.logger.debug(result, {structuredData: true});
//     res.send(result);
// });
// app.post('/', async (req, res) => {
//     const { title, description, authors, favorite, fileCover, fileName } = req.body;
//     const result = await admin.database().ref('/books').push({ title,
//         description,
//         authors,
//         favorite,
//         fileCover,
//         fileName });
//     functions.logger.debug(result, {structuredData: true});
//     res.status(201).send(result);
// });
// app.put('/:id', async (req, res) => {
//     const bookId = req.params.id;
//     const { title, description, authors, favorite, fileCover, fileName } = req.body;
//     const result = await admin.database().ref(`/books/${bookId}`).push({ title,
//         description,
//         authors,
//         favorite,
//         fileCover,
//         fileName });
//     functions.logger.debug(result, {structuredData: true});
//     res.status(201).send(result);
// });
// app.delete('/:id', async (req, res) => {
//     const bookId = req.params.id;
//     await admin.database().ref(`/books/${bookId}`).remove();
//     res.send('ok');
// });

exports.books = functions.https.onRequest(booksApp);
exports.moderator = moderator;