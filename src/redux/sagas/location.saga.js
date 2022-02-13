import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* queryLocation(action) {
  console.log('in GET location from address')
  const key = "AIzaSyACIq-9fmIlCVh1PfxrqpX1cnSEHs5fFek";
  // console.log('key=',key);
  const address = encodeURI(action.payload);
  // console.log(action.payload, "becomes", address);
  const googleResult = yield axios.get(`
  https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}
  `);
  console.log(googleResult);
  let lat, lng, formattedAddress;

  if (googleResult.data.status === "ZERO_RESULTS") {
    lat, lng, formattedAddress = null;
  } else {
    lat = googleResult.data.results[0].geometry.location.lat;
    lng = googleResult.data.results[0].geometry.location.lng;
    formattedAddress = googleResult.data.results[0].formatted_address;
  };

  console.log("result is:", lat, lng);
  yield put({ type: 'SET_LOCATION', payload: { lat, lng, formattedAddress } })
}

function* initGeolocation() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function* onSuccess(position) {
  console.log('in onSuccess')
  const {
    lat,
    lng
  } = position.coords;
  const formattedAddress = null;
  yield put({ type: 'SET_LOCATION', payload: { lat, lng, formattedAddress } })
}
function onError(){
  console.log('in onError')
  console.error("error in getting geolocation position 🙁")
}

function* locationSaga() {
  yield takeLatest('QUERY_LOCATION', queryLocation);
  yield takeLatest('INIT_GEOLOCATION', initGeolocation);
}
export default locationSaga;
