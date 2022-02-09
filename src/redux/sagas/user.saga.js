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

    // console.log(`in setSaveLocation with value=${value}`)
    yield axios.put(`/api/user/location/`, value, config);

  }
  catch (error) {
    console.error('error in setSaveLocation',error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SET_EMAIL', setEmail);
  yield takeLatest('UNSET_SAVE_LOCATION', () => setSaveLocation(false));
  yield takeLatest('SET_SAVE_LOCATION', () => setSaveLocation(true));
}

export default userSaga;
