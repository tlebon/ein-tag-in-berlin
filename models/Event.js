const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    Name: String,
    Time: String,
    Location: String,
      Details: String
})

module.exports = mongoose.model('Event', eventSchema)
