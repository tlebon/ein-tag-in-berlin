require('dotenv').config();

const mongoose = require("mongoose");
const Event = require("../models/Event");
console.log(process.env.MONGODB_URI)


const dbName = "ein-tag-in-berlin";
mongoose.connect(`mongodb://localhost/ein-tag-in-berlin`);
// mongodb://localhost/ein-tag-in-berlin

Event.updateMany(
  { venue: /Berghain/i },
  {
    venue: "Berghain"
    }
).then(() => {
  console.log("updated Berhain");
  mongoose.connection.close();
});

Event.updateMany(
  { venue: /war gestern/i },
  {
    venue: "Suess War Gestern"
    }
).then(() => {
  console.log("updated Suss");
  mongoose.connection.close();
});

// club-der-visionäre-berlin
Event.updateMany(
  { venue: /Club der/i },
  {
    venue: "Visionäre"
    }
).then(() => {
  console.log("updated");
  mongoose.connection.close();
});

Event.updateMany(
  { venue: /AVA/i },
  {
    venue: "AVA"
    }
).then(() => {
  console.log("updated");
  mongoose.connection.close();
});