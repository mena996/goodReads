const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    image: { type: String, required: true, minlength: 4 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
})

const bookModel = mongoose.model('Book', BookSchema);
module.exports = bookModel;