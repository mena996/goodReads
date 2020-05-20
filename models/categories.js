const mongoose = require('mongoose');
const BookModel = require('../models/books');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
})

CategorySchema.pre('findOneAndDelete', function(next) {
    BookModel.deleteMany({category_id: this._id}).exec();
    next();
});

const categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;