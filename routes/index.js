const express = require('express');
const router = express.Router();
const axios = require('axios')
const Event = require('../models/Event')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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

router.get('/locate/:lat/:lng', (req, res, next) => {
  // res.send(req.params)
  let today = formatDate(new Date());
  let bars = "";
  let restaurants = '';
  const bloop = ("https://api.yelp.com/v3/businesses/search?latitude=" + req.params.lat + "&longitude=" + req.params.lng + "&radius=2000&categories=restaurants&limit=3&sort_by=rating&open_now=true");
  const url = ("https://api.yelp.com/v3/businesses/search?latitude=" + req.params.lat + "&longitude=" + req.params.lng + "&radius=2000&categories=divebars,absinthebars,beachbars,beerbar,cocktailbars,lounges,pubs,whiskeybars,wine_bars,sportsbars,speakeasies&limit=3&sort_by=rating&open_now=true")
  // console.log(url)
  axios(
    url, {
      headers: {
        'Authorization': 'Bearer _qAdbCs6bFfmv-yAFllNXRJtKeO3MZUvjA274v_Fiof_FiKg4Uchv6JpNbTi3EUWi_wOgMIDIX62gASOOYDmhODB4CdwKrKhtJCrj2QcOkV-q7f1Zgg-B7-FyFqNW3Yx'
      }
    })
    .then(result => {
      // res.send(result.data.businesses)
      bars = result.data.businesses
      // res.render('index', { bars })
      // $(".results").append(businesses[0].alias)

      // console.log(urlb)
      return axios.get(
        bloop, {
          headers: {
            'Authorization': 'Bearer _qAdbCs6bFfmv-yAFllNXRJtKeO3MZUvjA274v_Fiof_FiKg4Uchv6JpNbTi3EUWi_wOgMIDIX62gASOOYDmhODB4CdwKrKhtJCrj2QcOkV-q7f1Zgg-B7-FyFqNW3Yx'
          }
        })

        .then(result => {
          // res.send(result.data.businesses)
          restaurants = result.data.businesses
          // console.log(restaurants)

          return Event.find({ date: today }, 'name venue image_url url', { limit: 3 })
        })
        .then(events => {
          console.log("restaurants"+ restaurants)
          res.render('index', { bars, restaurants, events })
          console.log(`Found ${events.length} events!-----`)
          // res.send(result)});
        })
    })
    .catch(err => {
      console.log(err)
    })
  })



module.exports = router;
