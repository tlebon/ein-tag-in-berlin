const express = require('express');
const router = express.Router();
const axios = require('axios')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/locate/:lat/:lng', (req, res, next) => {
  console.log(req.params)
  // res.send(req.params)
    const url = "https://api.yelp.com/v3/businesses/search?latitude=" + req.params.lat + "&longitude=" + req.params.lng + "&radius=2000&categories=bars&limit=3&sort_by=rating"
    axios({
      url,
      headers: {
        'Authorization': 'Bearer _qAdbCs6bFfmv-yAFllNXRJtKeO3MZUvjA274v_Fiof_FiKg4Uchv6JpNbTi3EUWi_wOgMIDIX62gASOOYDmhODB4CdwKrKhtJCrj2QcOkV-q7f1Zgg-B7-FyFqNW3Yx'
      }
    })
    .then(result => {
      // res.send(result.data.businesses)
      let bars = result.data.businesses
      console.log(bars)
      res.render('index',{bars})
      // $(".results").append(businesses[0].alias)
    })
});


module.exports = router;
