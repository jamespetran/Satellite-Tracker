import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import subHead from './subHead.reducer';
import satellites from './satellite.reducer';
import displayed from './displayed.reducer';
import favorites from './favorites.reducer';
import page from './page.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  subHead, // the subheading that shows the section of the app
  satellites, // stores the user's saved satellite information
  displayed, // stores the currently displayed satellite's info
  favorites, // grabs the user's saved satellites from the database
  page, // stores the current page of the api results
});

export default rootReducer;
