import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function OrbiterDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'GET_SATELLITE'})

  }, [])
  return (
    <div id="orbiter-details">
      OrbiterDetails
    </div>
  )
}

export default OrbiterDetails;