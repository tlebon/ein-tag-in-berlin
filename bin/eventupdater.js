const mongoose = require('mongoose');
const Event = require('../models/Event');

const dbName = 'ein-tag-in-berlin';
mongoose.connect(`mongodb://localhost/${dbName}`);



Event.updateMany(
  { venue: "Chalet" },
  { venue: "Chalet2UPDATED"
  }
).then(() => {
  console.log('updated');
  mongoose.connection.close();
});