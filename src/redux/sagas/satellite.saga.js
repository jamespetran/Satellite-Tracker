import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions



function* grabSatTle(action) {
  console.log("grab tle payload:",action.payload)
  try {
    const api = yield axios.get(`https://tle.ivanstanojevic.me/api/tle/?sort=popularity&page-size=10&page=${action.payload}`);
    const satellites = api.data.member;
    console.log(satellites);
    yield put({type: 'SET_SATELLITES_LIST', payload: satellites});
  }
  catch (error) {
    console.log('Grab satellite TLE error ~', error);
  }
}


function* satelliteSaga() {
  yield takeLatest('FETCH_SAT_TLE', grabSatTle);
}

export default satelliteSaga;
