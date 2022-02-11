import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* queryLocation(action) {
  console.log('in GET location from address')
  const key=process.env.GOOGLE_MAPS_API_KEY;
  console.log('key=',key);
  const address=encondeURI(action.payload);
  console.log(action.payload, "becomes", address);
  // const googleResuly = yield axios.get(`
  // https://maps.googleapis.com/maps/api/geocode/json?address=1517%20Sherwood%20Way&key=${key}
  // `)
}

function* locationSaga() {
  yield takeLatest('QUERY_LOCATION', queryLocation);
}
export default locationSaga;
