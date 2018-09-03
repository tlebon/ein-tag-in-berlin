const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Event = require("../models/Event");
//ITEMS NEEDED FOR RA CRAWLER
const axios = require("axios");

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

router.get("/events/addRA", (req, res, next) => {
  // apifyAPI.send('look this way for Resident Advisor Adds')
  getRACrawl();
});

const apifyAPI = axios.create({
  baseURL: "https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/lastExec/results?token=iXiFD2vg3SKvnHs9NEY3bPz9M"
});

function getRACrawl() {
    apifyAPI
    .get()
    .then(response => {
        let results=[]
        response.data.forEach(el => {
            // console.log(el.pageFunctionResult, `el: `)
            results.push(el.pageFunctionResult)
        });
      console.log(results,`done`);
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = router;
