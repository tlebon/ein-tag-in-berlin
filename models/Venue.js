const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  venue: {
      type: String,
      unique: true},
  address: String,
  addressFull: Object,
  yelpID: String,
  url: {
    type: String,
    unique: true
  },
  coordinates: Object,
  details: String
});

module.exports = mongoose.model("Venue", venueSchema);
