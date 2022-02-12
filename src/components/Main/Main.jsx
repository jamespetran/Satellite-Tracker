import CesiumMap from './CesiumMap/CesiumMap'
import OrbiterDetails from './OrbiterDetails/OrbiterDetails'
import UserDetails from './UserDetails/UserDetails'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Main.css';
import * as satellite from 'satellite.js';

function defineSatellite() {
  const location = useSelector(store => store.location);
  const displayed = useSelector(store => store.displayed);

  // Initialize a satellite record
  const satrec = satellite.twoline2satrec(
    displayed.line1,
    displayed.line2);

  //  Propagate satellite using time since epoch (in minutes).
  const positionAndVelocity = satellite.propagate(satrec, new Date());

  // The position_velocity result is a key-value pair of ECI coordinates.
  // These are the base results from which all other coordinates are derived.
  const positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

  // Set the Observer at specified location
  const observerGd = {
    longitude: satellite.degreesToRadians(location.lat),
    latitude: satellite.degreesToRadians(location.lng),
    height: 0.370
  };

  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  const gmst = satellite.gstime(new Date());

  // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
  const positionEcf = satellite.eciToEcf(positionEci, gmst),
    observerEcf = satellite.geodeticToEcf(observerGd),
    positionGd = satellite.eciToGeodetic(positionEci, gmst),
    lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
  // const dopplerFactor = satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);
  // observerCoordsEcf is not defined?? idk

  // The coordinates are all stored in key-value pairs.
  // ECI and ECF are accessed by `x`, `y`, `z` properties.
  const satelliteX = positionEci.x,
    satelliteY = positionEci.y,
    satelliteZ = positionEci.z;

  // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
  const azimuth = lookAngles.azimuth,
    elevation = lookAngles.elevation,
    rangeSat = lookAngles.rangeSat;

  // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
  const longitude = positionGd.longitude,
    latitude = positionGd.latitude,
    height = positionGd.height;

  //  Convert the RADIANS to DEGREES.
  const longitudeDeg = satellite.degreesLong(longitude),
    latitudeDeg = satellite.degreesLat(latitude);

  return { lat: longitudeDeg, lng: latitudeDeg };
}

function Main() {
  // selecting the satellite store
  const displayed = useSelector(store => store.displayed);
  const location = useSelector(store => store.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_DISPLAYED' });
  }, [dispatch]);


  // dispatch({
  //   type: "SET_SUBHEAD",
  //   payload: satellite.name
  // })

  return (
    <div className="main-content">
      <div id="subheader">
        <h2>{displayed.name}</h2>
      </div>

      <CesiumMap />
      <div id="details-container">
        <OrbiterDetails />
        <UserDetails />
      </div>
    </div>
  )
}

export default Main;