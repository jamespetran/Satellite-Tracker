import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* queryLocation(action) {
  console.log('in GET location from address')
  const address = encodeURI(action.payload.query);
  const googleResult = yield axios.post('/api/threePapi/',{address});
  console.log(googleResult);
  let lat, lng, formattedAddress;

  if (googleResult.data.status === "ZERO_RESULTS") {
    formattedAddress = null;
  } else {
    lat = googleResult.data.geometry.location.lat;
    lng = googleResult.data.geometry.location.lng;
    formattedAddress = googleResult.data.formatted_address;

    console.log(lat, lng, formattedAddress)
  };

  console.log("result is:", lat, lng);
  yield put({ type: 'SET_LOCATION', payload: { lat, lng, formattedAddress } })

  if (action.payload.locationSave) {
    yield put({type: "STORE_LOCATION", payload: { lat, lng} })
  }
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
