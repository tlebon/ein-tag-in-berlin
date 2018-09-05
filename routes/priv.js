const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
router.use(ensureLogin.ensureLoggedIn("/sign-in"));
const Event = require("../models/Event");
const bcrypt = require("bcrypt");
const User = require("../models/User");


router.get('/private', (req, res) => {
  Event.find({})
    .then(events => {
      res.render("event-list", { events });
    })
    .catch(console.error);
});

router.get("/delete/:id", checkRoles('admin'),(req, res) => {
  Event.findByIdAndRemove(req.params.id)
    .then(result => {
      res.redirect("/priv/private");
    })
    .catch(console.error);
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

module.exports = router;
