const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type:String,
    required:true},
    image_url:{
      type:String,
      default:'http://www.iheartberlin.de/wp-content/uploads/2016/05/Berlin-Club-Etiquette.jpg'},
  date: String,
  // time: String,
  venue: String,
  address: String,
  eventUrl: {
    type: String,
    unique: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  venuenameadjusted: {
    type: Boolean,
    default: false},
  yelpd: {
    type: Boolean,
    default: false},
  geoloc: Number,
  eventimg: String,
  details: String,
  yelpID: String,
});

module.exports = mongoose.model("Event", eventSchema);
