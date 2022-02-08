import CesiumMap from './CesiumMap/CesiumMap'
import OrbiterDetails from './OrbiterDetails/OrbiterDetails'
import UserDetails from './UserDetails/UserDetails'
import { useDispatch, useSelector } from 'react-redux';

function Main() {
  // selecting the satellite store
  const satellite = useSelector(store => store.satellite)
  const dispatch = useDispatch();


  // dispatch({
  //   type: "SET_SUBHEAD",
  //   payload: satellite.name
  // })

  return (
    <div className="main-content">
      <CesiumMap />
      <OrbiterDetails />
      <UserDetails />
    </div>
  )
}

export default Main;