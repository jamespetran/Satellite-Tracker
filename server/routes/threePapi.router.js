const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {


  console.log("new location request:", req.body.address);
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(googleRes => {
      console.log("googleRes", googleRes.data.results[0])
      res.send(googleRes.data.results[0]);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
