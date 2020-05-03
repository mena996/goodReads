const mongoose = require('mongoose');

const RateBookSchema = new mongoose.Schema({
    rate: { type: Number, required: true, min: 0, max: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
})
const rateBookModel = mongoose.model('RateBook', RateBookSchema);
module.exports = rateBookModel;