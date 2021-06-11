const { Schema, model } = require('mongoose');
const uidGenerator = require('node-unique-id-generator');

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

module.exports = model('Book', bookSchema);