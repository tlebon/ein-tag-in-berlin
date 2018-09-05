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
      default : 'user'},
    image: {
      type: String,
      default: `https://secure.meetupstatic.com/photos/member/8/3/d/a/highres_252873754.jpeg`
    }
})

module.exports = mongoose.model('User', userSchema)
