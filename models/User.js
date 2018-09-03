const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
      type: String,
      enum : ['user', 'tim','jason'],
      default : 'user'}
})

module.exports = mongoose.model('User', userSchema)
