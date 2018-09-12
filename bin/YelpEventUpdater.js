require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/Event");
const Venue = require("../models/Venue");
const axios = require("axios");

const dbName = "ein-tag-in-berlin";
mongoose.connect(process.env.MONGODB_URI);
//CONTROL MAX QUERY LIMIT BASED ON PERFORMANCE
const queryLimit = 50;
//LOG TROUBLE VENUES
let rejections = [];
/* MASTER FUNCTION */

const yelpIt = async () => {
  console.log(
    `From -::BIN/YELPEventUpdater.js launched: Event venues will be checked with YELP API and assigned coordinates!`
  );
  const eventArr = await getEvents();
  eventArrCleaned = [];
  console.log(`event Arr`, eventArr.length);
  eventArr.forEach(el => {
    if (!eventArrCleaned.includes(el.venue)) {
      eventArrCleaned.push(el.venue);
    }
  });
  console.log(`eventArrCLeaned is `, eventArrCleaned.length, "long");
  for (let event of eventArrCleaned) {
    try {
      // console.log(eventArr.length)

      const title = await getLoc(event);

      // console.log(`Venue ${event} yelp'd}`);

      await updater(event, title);
    } catch (err) {
      console.log("---------------------There is a problem with", event);
      rejections.push(event);
      console.error(err);
    }
  }
  console.log(`Rejected venues: `, rejections.length, rejections);
  // yelpRunning= false;
  // console.log(`yelpRunning =`,yelpRunning)
  process.exit(0);
};

// GET ALL EVENTS THAT ARE NOT YET ASSIGNED LOCATIONS *** AN ASYNC FUNCTION ****
const getEvents = () => {
  return new Promise((resolve, reject) => {
    Event.find({ yelpd: false }, "venue", { limit: queryLimit })
      .then(response => {
        if (response) {
          return resolve((eventArr = response));
        }
      })
      .catch(error => {
        return reject(error.message);
      });
  });
};

// CALL API FOR EACH EVENT VENUE
const getLoc = event => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.yelp.com/v3/businesses/search?term=${event}&location=Berlin`,

        {
          headers: {
            Authorization:
            process.env.yelp_key
          }
        }
      )
      .then(response => {
        if (response.data.businesses[0].coordinates) {
          return resolve(response.data.businesses[0]);
        } else {
          return resolve({
            //TEMPLEHOFFER FIELD
            latitude: 52.4757443343279,
            longitude: 13.4018100874023
          });
        }
      })
      .catch(error => {
        return reject(error.message);
      });
  });
};

// UPDATE ALL EVENTS WITH THE SAME VENUE
function updater(event, title) {
  return new Promise((resolve, reject) => {
    Event.updateMany(
      { venue: event, yelpd: false },
      {
        yelpd: true,
        coordinates: title.coordinates,
        location: title.location,
        yelpID: title.id,
        address: title.location.display_address,
        addressFull: title.location
      }
    ).then(() => {
      // console.log("updated-------------");
      resolve();
    });
  });
}

yelpIt();
