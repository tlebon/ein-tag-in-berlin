const mongoose = require("mongoose");
const Event = require("../models/Event");
const Venue = require("../models/Venue");
const axios = require("axios");

const dbName = "ein-tag-in-berlin";
mongoose.connect(`mongodb://localhost/${dbName}`);

let venuesArr = [
  { geoloc: 4, venue: "://about blank" },
  { geoloc: 4, venue: "Griessmuehle" },
  { geoloc: 4, venue: "Griessmuehle" },
  { geoloc: 4, venue: "Else" },
  { geoloc: 4, venue: "Sage Beach Berlin" },
  { geoloc: 4, venue: "Funkhaus Berlin" },
  { geoloc: 4, venue: "Suicide Circus" },
  { geoloc: 4, venue: "Berghain" },
  { geoloc: 5, venue: "Tresor" },
  { geoloc: 5, venue: "Weekend" },
  { geoloc: 5, venue: "AVA Club" },
  { geoloc: 5, venue: "Watergate" },
  { geoloc:5, venue: 'Seuss War Gestern' },
  { geoloc: 5, venue: "Birgit" },
  { geoloc: 5, venue: "Farbfernseher" },
  { geoloc: 5, venue: "Minimal Bar" },
  { geoloc: 5, venue: "Crack Bellmer" },
  { geoloc: 5, venue: "KitKatClub" },
  { geoloc: 5, venue: "Promenaden Eck" },
  { geoloc: 5, venue: "Cassiopeia" },
  { geoloc: 5, venue: "Wendel" },
  { geoloc: 5, venue: "Solar" }
];

// BUILD A LIST OF VENUES IN THE EVENT LIST
// let venuesArr = [];
// Venue.find({}).then(result => {
//   result.forEach(el => {
//     if (el.venue && venuesArr.indexOf(el.venue) == -1) {
//       venuesArr.push(el);
//     // Event.create(el.venue)
//     }
//   });
//   mongoose.connection.close();
//   // return venuesArr
//   console.log(venuesArr);
//   //   mongoose.connection.close();
// }
// );

// BUILD AN ASYNC FUNCTION
const getLoc = (num) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.yelp.com/v3/businesses/search?term=${num}&location=Berlin`,{
      headers: {
        Authorization:
      "Bearer _qAdbCs6bFfmv-yAFllNXRJtKeO3MZUvjA274v_Fiof_FiKg4Uchv6JpNbTi3EUWi_wOgMIDIX62gASOOYDmhODB4CdwKrKhtJCrj2QcOkV-q7f1Zgg-B7-FyFqNW3Yx"
      }
    }
  ).then(response => {
    if(response.data.businesses[0].coordinates){
      return resolve(response.data.businesses[0].coordinates)
    }else{
      return resolve({
        "latitude": 37.80587,
        "longitude": -122.42058
      })
    }
    })
    .catch(error => {
      return reject(error.message)
    })
  })
}

const start = async() => {
  for (let num of venuesArr) {
    try {
      const title = await getLoc(num.venue)
  
      console.log(`Venue ${num.venue}: ${title.longitude}`);
     
      await updater(num,title)
    } catch(err) {
      console.log("There is a problem with", num)
      console.error(err)
    }
  }
  console.log('Done');
  process.exit(0)
}

function updater(num,title){
  return new Promise((resolve, reject) => {
    Venue.findOneAndUpdate(
    { venue: num.venue },
    { coordinates: title}
  ).then(() => {
    console.log("updated");
    resolve()
  });

  })
}

start();

// POSITIVE TEST FOR DOING JUST ONE
// Venue.findOneAndUpdate(
//   { venue: /else/i },
//   { coordinates: {
//     long: 5000000, lat: 100000
//   }}
// ).then(() => {
//   console.log("updated");
//   mongoose.connection.close();
// });
