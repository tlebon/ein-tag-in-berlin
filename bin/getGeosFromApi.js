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
          process.env.yelp_key
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

