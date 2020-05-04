const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
    password: { type: String, required: true, minlength: 4 },
    image: { type: String, required: false},
    isadmin: { type: Boolean, required: true, minlength: 4 },
})
userSchema.pre('save',async function(){
    this.password=bcrypt.hashSync(this.password, 10);
});
userSchema.pre('updateOne',async function() {
    // console.log(this.password);
    // this._update.password="sdsdsdsdsdsdsdsdsdsddsdsdsd" ;
    // console.log(this._update.password);
  });
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;