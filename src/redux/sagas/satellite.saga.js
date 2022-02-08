import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSatellites() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/satellite', config);
    console.log(response.data);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    // yield put({ type: 'SET_SATELLITE', payload: response.data });
    yield put({type: "SET_SATELLITES", payload: response.data})

  } catch (error) {
    console.log('Satellite get request failed', error);
  }
}

function* addDefaultSat(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const username = { username: action.payload }
    console.log('add default sat for:', username)
    // this will add a default satellite so something shows up for the user~
    yield axios.post('/api/satellite/default', username);

    // now have to get updated user info including inputted email address
    yield put({ type: 'GET_SATELLITES' });
  }
  catch (error) {
    console.log('User set email request failed', error);
  }
}

function* satelliteSaga() {
  yield takeLatest('GET_SATELLITES', fetchSatellites);
  yield takeLatest('ADD_DEFAULT_SAT', addDefaultSat);
}

export default satelliteSaga;
