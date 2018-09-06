require('dotenv').config();

const mongoose = require("mongoose");
const Event = require("../models/Event");
const axios = require("axios");

const dbName = "ein-tag-in-berlin";
mongoose.connect(process.env.MONGODB_URI);

// BUILD A LIST OF VENUES IN THE EVENT LIST
let venuesArr = [];
Event.find({}, "venue")
  .then(result => {
    result.forEach(el => {
      if (el.venue && venuesArr.indexOf(el.venue)==-1) {
        venuesArr.push(el.venue);
      }
    })
    mongoose.connection.close();
    // return venuesArr
    console.log(venuesArr)
    start()
  })
  
//BUILD AN ASYNC FUNCTION
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
      await getLoc(num).then((title) => {
        console.log(`Venue ${num}: ${title}`);
      })
    }
    console.log('Done');
  }

  
// //FUNCTION USED TO GET COORDINATES
// async function getCoords(venue) {
//   let ven = venue;
//   let url = `https://api.yelp.com/v3/businesses/search?term=${ven}&location=Berlin`;
//   axios(url, {
//     headers: {
//       Authorization:
//         "Bearer _qAdbCs6bFfmv-yAFllNXRJtKeO3MZUvjA274v_Fiof_FiKg4Uchv6JpNbTi3EUWi_wOgMIDIX62gASOOYDmhODB4CdwKrKhtJCrj2QcOkV-q7f1Zgg-B7-FyFqNW3Yx"
//     }
//   }).then(results => results.data.businesses[0].coordinates);
// }
