const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
})
const categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;