const mongoose = require('mongoose');

const AutherSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    birthdate: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
    image: { type: String, required: true, minlength: 4 },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})

const autherModel = mongoose.model('Auther', AutherSchema);
module.exports = autherModel;