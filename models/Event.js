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
  url: {
    type: String,
    unique: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  geoloc: Number,
  details: String
});

module.exports = mongoose.model("Event", eventSchema);
