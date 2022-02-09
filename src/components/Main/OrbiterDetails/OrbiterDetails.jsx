import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function OrbiterDetails() {
  const satellites = useSelector(store => store.satellites);
  const dispatch = useDispatch();
  // console.log(satellites);

  const setOrbiter = () => {
    console.log('in setOrbiter');
  } // end setOrbiter

  useEffect(() => {
    dispatch({ type: 'GET_SATELLITES' })
  }, [])
  return (
    <div id="orbiter-details" className="detail-item">
      <div className="orbiter-item">
        <p>Orbiter Details:</p>
        <div>{satellites.map(satellite => satellite.displayed === true && <p key={satellite.id}>{satellite.noradID}</p>)}</div>
      </div>
      <div className="orbiter-item" id="orbit-details-btn">
        <button onClick={() => setOrbiter()}>Select Your Satellite!</button>
      </div>
    </div>
  )
}

export default OrbiterDetails;