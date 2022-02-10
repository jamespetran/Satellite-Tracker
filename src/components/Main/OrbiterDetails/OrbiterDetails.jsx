import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function OrbiterDetails() {
  const history=useHistory();
  const satellites = useSelector(store => store.satellites);
  const dispatch = useDispatch();
  // console.log(satellites);

  const setOrbiter = () => {
    // console.log('in setOrbiter');
    history.push('/satellites');
  } // end setOrbiter

  useEffect(() => {
    dispatch({ type: 'GET_SATELLITES' })
  }, [])
  return (
    <div id="orbiter-details" className="detail-item content-wrapper-push-outside-col">
      <div className="orbiter-item">
        <h3 className="details-title">Orbiter Details:</h3>
        <div>{satellites.map(satellite => satellite.displayed === true && <p key={satellite.id}>{satellite.noradID}</p>)}</div>
      </div>
      <div className="orbiter-item" id="orbit-details-btn">
        <button className="main-btn btn" onClick={() => setOrbiter()}>Select Satellite</button>
      </div>
    </div>
  )
}

export default OrbiterDetails;