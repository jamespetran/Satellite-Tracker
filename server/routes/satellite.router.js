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
  const queryParams = [req.user.id];
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

router.post('/default', (req, res) => {
  // create ISS for new user upon registration -> 
  // with displayed=true
  const queryText = `
  INSERT INTO "trackedSatellite" 
    ("userID", 
    "noradID", 
    "displayed")
  VALUES
    ((SELECT "id" FROM "user" WHERE username = $1),
    25544,
    true)
  `;
  // params must be the username they submitted into the
  // username input upon registration...user won't be logged in
  // when this is created
  const queryParams =[ req.body.username ] 
  pool.query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
