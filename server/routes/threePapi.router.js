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
router.post('/latlng', (req, res) => {
  console.log("new location request:", req.body.address);
  axios.get(`
  https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.GOOGLE_MAPS_API_KEY}
  `)
    .then(googleRes => {
      console.log("googleRes", googleRes.data.results[0])
      res.send(googleRes.data.results[0]);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.post('/address', (req, res) => {
  // console.log(`new address request:`, req.body);
  const location = req.body;
  axios.get(`
  https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}
  `)
    .then(googleRes => {
      const address=googleRes.data.results[0].formatted_address;
      console.log("googleRes:", address)
      res.status(200).send({address});
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });

})
module.exports = router;


