const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// handles ajax requests to set email
router.post('/email', rejectUnauthenticated, (req, res) => {
  const email = req.body.email;
  // console.log('post /email router w/ value:', email);
  // console.log('user:',req.user)
  // console.log(req.body.email);
  if (validateEmail(email)) {
    const sqlQuery = `
      UPDATE "user"
      SET email = $1
      WHERE id = $2
    `;
    const sqlParams = [email, req.user.id]
    pool.query(sqlQuery, sqlParams)
      .then(dbRes => {
        res.sendStatus(201);
      })
      .catch(error => {
        //if fail:
        res.status(500).send(error);
      })
  } else {
    const error = { type: "data validation failure", attempt: email }
    res.status(500).send(error)
  }
})

// validates that an entered email address is 
// correctly formatted like an actual email address should be
// regex code is adapted from 
// https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


//handles PUT api/user/location/save settings in database
router.put('/location/save', (req, res) => {
  // console.log(req);
  const queryText = `
    UPDATE "user"
    SET "saveLocation" = $1
    WHERE id = $2;
  `;
  const queryParams = [req.body.value, req.user.id]

  pool.query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

router.put('/location', async (req, res) => {
  try {
    // console.log(`req.body: `, req.body);
    const queryText = `
    UPDATE "user"
    SET latitude = $1, longitude = $2
    WHERE id = $3 AND "saveLocation" = true
    `;
    const queryParams = [
      req.body.latitude,
      req.body.longitude,
      req.user.id
    ];
    dbRes = await pool.query(queryText, queryParams);
    await res.sendStatus(200);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

router.delete('/location', (req, res) => {
  // delete existing latitude and longitude stored values
  const queryText = `
  UPDATE "user"
  SET 
    latitude = null, 
    longitude = null
  WHERE id = $1;
  `;
  const queryParams = [req.user.id];

  pool.query(queryText, queryParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

router.post('/location', (req, res) => {
  const queryText = `
  UPDATE "user"
  SET latitude = $1, longitude = $2, elevation = 0
  WHERE id = $3 AND "saveLocation" = true;
  `;
  const queryParams = [
    req.body.lat,
    req.body.lng,
    req.user.id
  ];
  pool.query(queryText, queryParams)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
})


module.exports = router;
