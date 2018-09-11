const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Event = require("../models/Event");
//ITEMS NEEDED FOR RA CRAWLER
const axios = require("axios");
const startHTML = require("../utils/apifycrawler");
const resultsHTML = require("../utils/apifycrawler");
const lastExec = require("../utils/apifycrawler");

//NEEDED FOR DATA MANIPULATION
// const checkRoles = require("./priv")
const Today = require("../utils/dateSetup");
const moment = require("moment");
// import {formatDate} from '../utils/dateSetup'

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", (req, res, next) => {
  const { username, password, role, image } = req.body;

  const encrypted = bcrypt.hashSync(password, 10);

  new User({ username, password: encrypted, role, image })
    .save()
    .then(result => {
      res.render("index", { error: "User account was created" });
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.render("sign-up", { error: "user exists already" });
      }
      console.error(err);
      res.send("something went wrong");
    });
});

router.get("/sign-in", ensureLoggedOut(), (req, res, next) => {
  res.render("sign-in", { error: req.flash("error") });
});

router.post(
  "/sign-in",
  ensureLoggedOut(),
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/sign-in",
    failureFlash: true
  })
);
router.get("/sign-out", ensureLoggedIn("/sign-in"), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/profile", ensureLoggedIn("/sign-in"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/events/add", ensureLoggedIn("/sign-in"), (req, res, next) => {
  res.render("create-event");
});

router.post("/events/add", ensureLoggedIn("/sign-in"), (req, res, next) => {
  const { name, date, time, venue, address, url, details } = req.body;
  new Event({ name, date, time, venue, address, url, details })
    .save()
    .then(result => {
      res.render("index", { error: "Event Created!" });
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.redirect("index", { error: "Event already exists" });
      }
      console.error(err);
      res.send("something went wrong");
    });
});

// axios call for resuls  why is it results.results??
const apifyAPI = axios.create({
  baseURL: resultsHTML.resultsHTML
});
router.get("/events/addRA", checkRoles('admin'),(req, res, next) => {
  res.render("addRA");
});
// GET DETAILS ON LAST CALLED CRAWL
router.get("/startCrawl", checkRoles('admin'),(req, res, next) => {
  console.log(`I would like to start the crawl...`, startHTML.startHTML);
  axios.post(startHTML.startHTML).then(() => {
    res.send(`Initiated, Check Status before Submitting`);
  });
});
router.get("/statusCrawl", (req, res, next) => {
  axios.get(lastExec.lastExec).then(response => {
    res.send(response.data[response.data.length - 1]);
    // console.log(response.data)
  });
});


/* MAKE SURE TO MAKE THIS AUTHORIZED AND LOGGED IN AS ADMIN */
router.get("/events/addRAresults", checkRoles('admin'),(req, res, next) => {
  addRAEvents();
  // let autoRAEvents = setInterval(addRAEvents,17280000000000)
  // console.log(`Set Interval of autoRAEvents`)
});


router.get("/events/stopautoevents", checkRoles('admin'),(req, res, next) => {
   clearInterval(autoRAEvents);
   console.log(`cleared Interval of autoRAEvents`)
});

//PURGE ALL EVENTS
router.get("/delete/all", checkRoles('admin'), (req, res) => {
  // res.send(`Events Purged`);
  Event.remove({})
    .then(result => {
      console.log(`Events Purged`);
      res.redirect("/priv/private");
    })
    .catch(console.error);
});

// ADD GEO LOC FIELD
router.get("/updateall", checkRoles('admin'), (req, res) => {
  console.log(`updating some shit`);
  Event.updateMany(
    { venue: "Chalet" },
    {
      location: {
        lat: 1,
        lng: 2
      }
    }
  ).then(() => {
    res.send(`updated`);
  });
});

// RETURN TODAYS EVENTS!
function formatDate(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}
router.get("/jasonsview", (req, res) => {
  let today = formatDate(new Date());
  console.log(today);
  Event.find({ date: today,  yelpd:true }, null, {limit: 10}).then(result => {
    console.log(`Found ${result.length} events!-----`);
    res.send(result);
  });
});

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect("/sign-in");
    }
  };
}

function addRAEvents(){
  axios.get(lastExec.lastExec).then(response => {
    if (response.data[response.data.length - 1].status === `SUCCEEDED`) {
      apifyAPI.get().then(response => {
        console.log(`getting: `, resultsHTML.resultsHTML);
        let results = [];
        response.data.forEach(el => {
          if (el != "null") {
            results.push(el.pageFunctionResult);
          }
        });
        // results.shift()
        console.log(results, results.length);
        Event.create(results, err => {
          if (err) {
            console.log(`there was 1 error`);
          }
          console.log(`Created ${results.length} events maybe`);
        });
        res.redirect(`/priv/private`);
      });
    } else {
      console.log(`crawl not finished check apify run page`);
    }
  });
}

const yelp = require('../routes/YelpEventUpdater-copy')


router.get("/getcoords", (req, res) => {
  yelp();
  // let autoYelp = setInterval(yelp, 17280000000000)
  // console.log(autoYelp)
  console.log(`yelpIt activated`)
});

router.get("/stopyelpevents", (req, res) => {
  clearInterval(autoYelp)
  console.log(`autoYelp Interval Cleared`)
});
module.exports = router;
