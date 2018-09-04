const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: {
    type:String,
    required:true},
  date: String,
  time: String,
  address: String,
  url: {
    type: String,
    unique: true},
  location: {
    lat: Number,
    lng: Number,
},
  details: String
})

module.exports = mongoose.model('Event', eventSchema)
