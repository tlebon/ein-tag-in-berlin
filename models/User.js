const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
      type:String,
      required: true,
    unique: true},
    password: String,
    role: {
      type: String,
      enum : ['user', 'admin'],
      default : 'user'}
})

module.exports = mongoose.model('User', userSchema)
