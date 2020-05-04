const mongoose = require('mongoose');
let bookModel = require('./authors');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 },
    body: { type: String, required: true, maxlength: 250 },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
})
BookSchema.pre('save', async function () {
    UserModel.updateOne(
        { _id: this.auther_id },
        { $push: { books: this.id } },
        (err) => {
            if (err)
                console.log(err);
        });
});
const bookModel = mongoose.model('Book', BookSchema);
module.exports = bookModel;