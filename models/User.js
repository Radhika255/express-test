const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  phoneNo: String,
  email: String,
  age: Number,
  gender: String,
  password: String,
  status: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema)