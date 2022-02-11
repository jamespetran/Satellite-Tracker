import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchFavorites() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/favorites', config);
    // yield console.log('fetchFavorites response', response)
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

    const response = yield axios.get('/api/favorites/displayed', config);

    yield put({type: 'SET_DISPLAYED', payload: response.data })

  } catch (error) {
    console.log('Satellite get request failed ~', error);
  }
}

function* addDisplayed(action) {
  yield axios.put(`/api/favorites/displayed/${action.payload}`);
  yield put({ type: 'GET_DISPLAYED' })

}

function* addDefaultSat(action) {
  try {

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

function* addFavorite(action) {
  try{
    // console.log(action.payload)
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/favorites', action.payload, config);
    yield put({
      type: 'FETCH_FAVORITES'
    })
  }
  catch (error) {
    console.log('ADD_TO_FAVES request failed ~', error);
  }
}

function* deleteFavorite(action) {
  // console.log("delete",action.payload)
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.delete(`/api/favorites/${action.payload.id}`, config)
  }
  catch (error) {
    console.log('DELETE_FAVORITE request failed ~', error);
  }
}


function* favoriteSaga() {
  yield takeLatest('FETCH_FAVORITES', fetchFavorites);
  yield takeLatest('GET_DISPLAYED', fetchDisplayed);
  yield takeLatest('ADD_DEFAULT_SAT', addDefaultSat);
  yield takeLatest('ADD_TO_FAVES', addFavorite);
  yield takeLatest('DELETE_FAVORITE', deleteFavorite);
  yield takeLatest('ADD_DISPLAYED', addDisplayed);
}

export default favoriteSaga;
