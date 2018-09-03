const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/User')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/sign-up', (req, res, next) => {
    res.render('sign-up')
})

router.post('/sign-up', (req, res, next) => {
    const { username, password, role } = req.body

    const encrypted = bcrypt.hashSync(password, 10)

    new User({ username, password: encrypted, role })
        .save()
        .then(result => {
            res.render('index',{error: 'User account was created'})
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.render('sign-up', { error: 'user exists already' })
            }
            console.error(err)
            res.send('something went wrong')
        })
})

router.get('/sign-in', ensureLoggedOut(),(req, res, next) => {
    res.render('sign-in', { error: req.flash('error') })
})

router.post(
    '/sign-in', ensureLoggedOut(),
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sign-in',
        failureFlash: true,
    })
)
router.get('/sign-out', ensureLoggedIn('/sign-in'),(req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/profile', ensureLoggedIn('/sign-in'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});


module.exports = router;
