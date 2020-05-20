const mongoose = require('mongoose');
const BookModel = require('../models/books');

const AuthorSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    birthDate: { type: Date, required: true },
    image: { type: String, required: true, minlength: 4 },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})

AuthorSchema.pre('findOneAndDelete', function(next) {
    BookModel.deleteMany({author_id: this._id}).exec();
    next();
});

const authorModel = mongoose.model('Author', AuthorSchema);
module.exports = authorModel;