const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    birthDate: { type: Date, required: true},
    image: { type: String, required: true, minlength: 4 },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})

const authorModel = mongoose.model('Author', AuthorSchema);
module.exports = authorModel;