import CesiumMap from './CesiumMap/CesiumMap'
import OrbiterDetails from './OrbiterDetails/OrbiterDetails'
import UserDetails from './UserDetails/UserDetails'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Main.css';



function Main() {
  // selecting the satellite store
  const displayed = useSelector(store => store.displayed);
  const location = useSelector(store => store.location);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const getAddress = () => {
    // did user request to save location in DB?? 
    // and is the formattedAddress from google === Null?
    if (user.saveLocation && location.formattedAddress === null) {
      // did user previously save an address in db?
      if (
        user.latitude !== null &&
        user.longitude !== null
      ) {
        // console.log('QUERY_ADDRESS going out')
        // then grab location info from user profile
        const location = { lat: user.latitude, lng: user.longitude }
        dispatch({ type: "QUERY_ADDRESS", payload: location })
      }
      // is the formattedAddress from google === Null?
    } else if (location.formattedAddress === null) {
      // then grab location info from location temporary info
      const latLng = { lat: location.lat, lng: location.lng }
      dispatch({ type: "QUERY_ADDRESS", payload: latLng })
    }
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_DISPLAYED' });
    getAddress();
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