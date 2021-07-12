import mongoose , { Schema, Document, Model } from 'mongoose';
import uidGenerator from 'node-unique-id-generator';
import { IBook } from '../contracts/models';

const bookSchema = new Schema({
    id: {
        type: String, default: uidGenerator.generateUniqueId
    },
    title: {
        type: String, required: true
    },
    description: String,
    authors: String,
    favorite: String,
    fileCover: String,
    fileName: String
})

export const Book = mongoose.model<IBook & Document>('Book', bookSchema);