const express = require('express');
const router = express.Router();
const axios = require('axios')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/locate/:lat/:lng', (req, res, next) => {
  const url = "https://api.yelp.com/v3/businesses/search?latitude=" + lat + "&longitude=" + lng + "&radius=2000"
  axios({
    url,
    headers: {
      'Authorization': 'Bearer _qAdbCs6bFfmv-yAFllNXRJtKeO3MZUvjA274v_Fiof_FiKg4Uchv6JpNbTi3EUWi_wOgMIDIX62gASOOYDmhODB4CdwKrKhtJCrj2QcOkV-q7f1Zgg-B7-FyFqNW3Yx'
    }
  })
    .then(result => {
      console.log(result)
      $(".results").append(businesses[0].alias)
    })
});


module.exports = router;
