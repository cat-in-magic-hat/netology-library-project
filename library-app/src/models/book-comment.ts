import { Schema, model } from 'mongoose';

const bookCommentSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId, ref: 'Book'  
    },
    userName: {
        type: String, required: true
    },
    text: {
        type: String, required: true
    },
    created: {
        type: Date, default: Date.now
    }
})

export const BookComment = model('BookComment', bookCommentSchema);