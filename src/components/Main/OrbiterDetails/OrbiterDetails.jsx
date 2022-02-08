import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function OrbiterDetails() {
  const satellites = useSelector( store => store.satellites);
  const dispatch = useDispatch();
  // console.log(satellites);
  useEffect(() => {
    dispatch({ type: 'GET_SATELLITE' })

  }, [])
  return (
    <div id="orbiter-details" className="detail-item">
      <p>Orbiter Details:</p>
      <div>{satellites.map(satellite => satellite.displayed === true && <p key={satellite.id}>{satellite.noradID}</p>)}</div>
    </div>
  )
}

export default OrbiterDetails;