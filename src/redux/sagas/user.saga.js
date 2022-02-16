import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* setEmail(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const email = { email: action.payload }
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    // this will allow a user to set their email
    // console.log('action.payload:', action.payload)
    yield axios.post('/api/user/email', email, config);

    // now have to get updated user info including inputted email address
    yield put({ type: 'FETCH_USER' });
  }
  catch (error) {
    console.log('User set email request failed', error);
  }
}

function* setSaveLocation(value) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // update "saveLocation" column with true/false
    yield axios.put(`/api/user/location/save`, { value }, config);

    // if user is trying to set saveLocation = false, 
    // then delete previously saved locations
    if (value === false) {
      yield axios.delete(`/api/user/location`, config);
    }

    yield put({ type: 'FETCH_USER' });


  }
  catch (error) {
    console.error('error in setSaveLocation', error)
  }
}

function* storeLocation(action) {
  console.log("action.payload:", action.payload)
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  const locationObject = {latitude: action.payload.lat, longitude: action.payload.lng}
  axios.put('/api/user/location', locationObject, config);

}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SET_EMAIL', setEmail);
  yield takeLatest('UNSET_SAVE_LOCATION', () => setSaveLocation(false));
  yield takeLatest('SET_SAVE_LOCATION', () => setSaveLocation(true));
  yield takeLatest('SET_LOCATION', storeLocation)
}

export default userSaga;
