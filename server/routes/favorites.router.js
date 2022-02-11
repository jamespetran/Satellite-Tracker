const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all from db linked to userid
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
      console.error('error in GET /favorites', error);
      res.status(500).send(error);
    });
});

// get from db where value:displayed = true
router.get('/displayed', (req, res) => {
  console.log('in GET /api/favorite/displayed')
  const queryText = `
  SELECT * FROM "trackedSatellite"
  WHERE "userID" = $1 AND displayed = true;
  `;
  const queryParams = [req.user.id];
  pool.query(queryText, queryParams)
    .then(dbRes => {
      res.status(200).send(dbRes.rows[0]);
    })
    .catch(error => {
      console.error('error in GET /favorites/displayed', error);
      res.status(500).send(error);
    });
})

// post to db for new user registration
router.post('/default', (req, res) => {
  console.log('in POST /api/favorite/default')
  // create ISS for new user upon registration -> 
  // with displayed=true
  // console.log(req.body)
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
  ];
  pool.query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
})

// add new fav to db
router.post('/', (req, res) => {
  console.log('in POST /api/favorite');
  const queryText = `
  INSERT INTO "trackedSatellite" 
    ("userID", 
    "noradID", 
    "name",
    "line1",
    "line2")
  VALUES
    ($1,
    $2,
    $3,
    $4,
    $5)
  `;
  const queryParams = [
    req.user.id,
    req.body.satelliteId,
    req.body.name,
    req.body.line1,
    req.body.line2
  ];
  pool.query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

// delete from db
// router.delete('/api/favorite')


// set as displayed
router.put('/displayed/:noradID', (req, res) => {
  const queryText = ` 
  UPDATE "trackedSatellite"
  SET displayed = CASE 
  					WHEN "noradID" = $2 THEN true
  					WHEN "noradID" != $2 THEN false
    END
  WHERE "userID" = $1;  `;
  const queryParams = [
    req.user.id,
    req.params.noradID
  ];

  pool.query(queryText, queryParams)
    .then(dbRes => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
})

module.exports = router;
