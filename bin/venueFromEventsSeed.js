const mongoose = require("mongoose");
const Event = require("../models/Event");
const Venue = require("../models/Venue");
const axios = require("axios");

const dbName = "ein-tag-in-berlin";
mongoose.connect(process.env.MONGODB_URI);

// BUILD A LIST OF VENUES IN THE EVENT LIST
let venuesArr = [];
Event.find({}).then(result => {
  result.forEach(el => {
    if (el.venue && venuesArr.indexOf(el.venue) == -1) {
      venuesArr.push(el.venue);
    // Event.create(el.venue)
    }
  });
  mongoose.connection.close();
  // return venuesArr
  console.log(venuesArr);
  //   mongoose.connection.close();
}
);


// BUILD AN ASYNC FUNCTION
//   const getLoc = (num) => {
//     return new Promise((resolve, reject) => {
//       Venue.create(num)
//   })
// }

//   const start = async() => {
//     for (let num of venuesArr) {
//       await getLoc(num).then((title) => {
//         console.log(`Venue ${num}: ${title}`);
//       })
//     }
//     console.log('Done');
//   }
// results = [{ _id: 5b8fab883a9c074364cd18e1,
//     venue: 'Club der Visionaere',
//     address: 'Venue /Club der Visionaere Am Flutgraben 1, 12435 Berlin, Germany  Germany',
//     url: 'https://www.residentadvisor.net/events/1148471' },
//   { _id: 5b8fab883a9c074364cd18e5,
//     venue: 'Farbfernseher',
//     address: 'Venue /Farbfernseher Skalitzer Strasse 114; Kreuzberg; 10999 Berlin; GermanyGermany',
//     url: 'https://www.residentadvisor.net/events/1152833' },
//   { _id: 5b8fab883a9c074364cd18e3,
//     venue: 'Minimal Bar',
//     address: 'Venue /Minimal Bar Rigaer Strasse 31; Friedrichshain; 10247 Berlin; Germany  Germany',
//     url: 'https://www.residentadvisor.net/events/1133695' }]

//   Venue.create(results, err => {
//     if (err) {
//       throw err;
//     }
//     console.log(`Created ${results.length} events`);
//   //   mongoose.connection.close();
//   })