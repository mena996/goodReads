const mongoose = require('mongoose');

const ReviewBookSchema = new mongoose.Schema({
    review: { type: String, required: true, minlength: 2 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
})
const reviewBookModel = mongoose.model('ReviewBook', ReviewBookSchema);
module.exports = reviewBookModel;