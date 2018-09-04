const mongoose = require("mongoose");
const Event = require("../models/Event");

const dbName = "ein-tag-in-berlin";
mongoose.connect(`mongodb://localhost/${dbName}`);

Event.updateMany(
  { venue: "Chalet" },
  {
    location: {
      lat: 25,
      lng: 25,
    }
  }
).then(() => {
  console.log("updated");
  mongoose.connection.close();
});
