import CesiumMap from './CesiumMap/CesiumMap'
import OrbiterDetails from './OrbiterDetails/OrbiterDetails'
import UserDetails from './UserDetails/UserDetails'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Main.css';

function Main() {
  // selecting the satellite store
  const displayed = useSelector(store => store.displayed);
  const subheader = useSelector(store => store.subHead);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_SATELLITES' });
  }, [dispatch]);


  // dispatch({
  //   type: "SET_SUBHEAD",
  //   payload: satellite.name
  // })

  return (
    <div className="main-content">
      <div id="subheader">
        <h2>{subheader.name}</h2>
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