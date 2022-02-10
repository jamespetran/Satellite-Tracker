import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchFavorites() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const queryText = `
    SELECT * FROM "trackedSatellite"
    WHERE "userID" = $1
    `

    const response = yield axios.get('/api/favorites', config);
    yield console.log('fetchFavorites response', response)
    yield put({type: 'SET_FAVORITES', payload: response.data})
  }
  catch (error) {
    console.log('Favorites fetch request failed ~', error);

  }
}

function* fetchDisplayed() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/satellite/displayed', config);
    // console.log(response.data);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    // yield put({ type: 'SET_SATELLITE', payload: response.data });
    yield put({type: "SET_SATELLITES", payload: response.data})

    // set the displayed satellite to store
    for (const satellite of response.data) {
      if( satellite.displayed === true) { 
        let displayedSat = yield axios.get(`https://tle.ivanstanojevic.me/api/tle/${satellite.noradID}`);
        yield put({
          type: `SET_DISPLAYED`,
          payload: displayedSat.data,
        });
        yield put({ 
          type: "SET_SUBHEAD_SAT", 
          payload: displayedSat.data.name });
        return;
      }
    }


  } catch (error) {
    console.log('Satellite get request failed ~', error);
  }
}

function* addDefaultSat(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    let satData = yield axios.get('https://tle.ivanstanojevic.me/api/tle/25544')
    yield satData = {...satData, username: action.payload }

    // this will add a default satellite so something shows up for the user~
    console.log("satData:",satData);
    yield axios.post('/api/favorites/default', satData);

    // update satellites store
    yield put({ type: 'FETCH_FAVORITES' });
  }
  catch (error) {
    console.log('FETCH_FAVORITES request failed ~', error);
  }
}


function* favoriteSaga() {
  yield takeLatest('FETCH_FAVORITES', fetchFavorites);
  yield takeLatest('GET_DISPLAYED', fetchDisplayed);
  yield takeLatest('ADD_DEFAULT_SAT', addDefaultSat);
}

export default favoriteSaga;
