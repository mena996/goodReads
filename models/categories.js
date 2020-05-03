const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})
const categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;