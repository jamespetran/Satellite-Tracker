import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import useGeolocation from 'react-hook-geolocation'

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Main from '../Main/Main';
import Location from '../Location/Location';
import Satellites from '../Satellites/Satellites'

import './App.css';



function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const page = useSelector(store => store.page);

  useEffect(() => {
    dispatch({ type: 'GET_DISPLAYED' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [])

  useEffect(() => {
    dispatch({ type: 'FETCH_SAT_TLE', payload: page.tle})
  })

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES', payload: 1})
  })


  return (
    <Router>
      <div className="content-wrapper-push-outside-col">
        <div id="header-container">
          <Link to="/home">
            <div className="nav container" id="header">
              <h1 className="nav-title">Satellite Tracker</h1>
            </div>
          </Link>
        </div>

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Main />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>
          <ProtectedRoute
            exact
            path="/location"
          >
            <Location />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/satellites">
            <Satellites />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1 id="404-display">404</h1>
          </Route>
        </Switch>
        <Footer
          id="footer-container"
        />
      </div>
    </Router >
  );
}

export default App;
