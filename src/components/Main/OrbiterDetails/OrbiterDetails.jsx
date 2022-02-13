import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function OrbiterDetails() {
  const history = useHistory();
  const displayed = useSelector(store => store.displayed);
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
      <div className="orbiter-item" >
        <h3 className="details-title">
        {displayed.name !== "Select a Satellite to Display" ? "Orbiter Details:" : displayed.name}
        </h3>
        {displayed.name !== "Select a Satellite to Display" ?
        <p id="orbiter-details">Name: {displayed.name}<br />
          NORAD ID: {displayed.noradID}<br />TLE:
          <code style={{ fontSize: "11px" }}>{
            displayed.line1}
            <br />
            <br />
            {displayed.line2}
          </code>
        </p>
        :
        null
        }

      </div>
      <div className="orbiter-item" id="orbit-details-btn">
        <button className="main-btn btn" onClick={() => setOrbiter()}>Select Satellite</button>
      </div>
    </div>
  )
}

export default OrbiterDetails;