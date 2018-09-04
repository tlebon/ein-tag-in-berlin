const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Event = require("../models/Event");
//ITEMS NEEDED FOR RA CRAWLER
const axios = require("axios");
const startHTML = require('../utils/apifycrawler')
const resultsHTML = require('../utils/apifycrawler')
const lastExec = require('../utils/apifycrawler')



router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", (req, res, next) => {
  const { username, password, role } = req.body;

  const encrypted = bcrypt.hashSync(password, 10);

  new User({ username, password: encrypted, role })
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
  const { name, date, time, address, details } = req.body;
  new Event({ name, date, time, address, details })
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
router.get("/events/addRA", (req, res, next) => {
  res.render("addRA");
});
// GET DETAILS ON LAST CALLED CRAWL
router.get("/startCrawl", (req, res, next) => {
  console.log(`I would like to start the crawl...`, startHTML.startHTML)
  axios.post(startHTML.startHTML)
  .then(() =>{res.send(`Initiated, Check Status before Submitting`)})
});
router.get("/statusCrawl", (req, res, next) => {
  axios.get(lastExec.lastExec).then(response => {
    res.send(response.data[response.data.length-1])
    // console.log(response.data)
  })
});
/* MAKE SURE TO MAKE THIS AUTHORIZED AND LOGGED IN AS ADMIN */
router.get("/events/addRAresults", (req, res, next) => {
  axios.get(lastExec.lastExec).then(response => {
    if(response.data[response.data.length-1].status === `SUCCEEDED`){
      apifyAPI.get().then(response=> {
        console.log(`getting: `, resultsHTML.resultsHTML)
        let results = [];
        response.data.forEach(el => {
          if(el != 'null'){results.push(el.pageFunctionResult)};
        })
        // results.shift()
        console.log(results,results.length)
        Event.create(results, (err) =>{
          if (err) {console.log(`there was 1 error`) }
          console.log(`Created ${results.length} events maybe`)
        })
        res.redirect(`/priv/private`)
      })
    } else {console.log(`crawl not finished check apify run page`)}
});
})

module.exports = router;
