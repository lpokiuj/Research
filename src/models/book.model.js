const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Book', bookSchema);