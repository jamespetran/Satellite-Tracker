const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `
  SELECT * FROM "trackedSatellite"
  WHERE "userID" = $1;
  `;
  const queryParams = [ req.user.id ];
  console.log(req.user.id)
  pool.query(queryText, queryParams)
    .then((dbRes) => {
      console.log('GET /satellites success', dbRes.rows)
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.error('error in GET /satellite', error);
      res.status(500).send(error);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
