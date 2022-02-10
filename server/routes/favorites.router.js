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
      // console.log('GET /favorites success', dbRes.rows)
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.error('error in GET /satellite', error);
      res.status(500).send(error);
    });
});
router.post('/default', (req, res) => {
  console.log('in POST /default')
  // create ISS for new user upon registration -> 
  // with displayed=true
  console.log(req.body)
  const queryText = `
  INSERT INTO "trackedSatellite" 
    ("userID", 
    "noradID", 
    "displayed",
    "name",
    "line1",
    "line2")
  VALUES
    ((SELECT "id" FROM "user" WHERE username = $1),
    $2,
    true,
    $3,
    $4,
    $5)
  `;
  // params must be the username they submitted into the
  // username input upon registration...user wont be logged in
  // when this is created
  const queryParams = [
    req.body.username,
    req.body.data.satelliteId,
    req.body.data.name,
    req.body.data.line1,
    req.body.data.line2
  ]
  pool.query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
})

module.exports = router;
