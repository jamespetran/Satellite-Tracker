import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function UserDetails() {
  const history = useHistory();
  const location = useSelector(store => store.location)
  const [locationEdit, setLocationEdit] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const dispatch = useDispatch();



  const goToLocationPage = () => {
    history.push('/location');
  }

  const handleLocationSubmit = (evt) => {
    evt.preventDefault();
    dispatch({ type: "QUERY_LOCATION", payload: locationInput })
    setLocationEdit(false);
    setLocationInput('');
  }

  return (
    <div id="user-details" className="detail-item">
      <div className="user-item">
        <h3 className="details-title">User Details:</h3>
        {location.formattedAddress === null ?
          <p>
            Choose your address with the button below
          </p>
          :
          <div>
            <p>Your Address is {location.formattedAddress}</p>
          </div>
        }
      </div>
      <div className="user-item" id="orbit-details-btn">
        {locationEdit ?
          <form id="location-submit-form" onSubmit={(evt) => handleLocationSubmit(evt)}>
            <label htmlFor="location-input" >Enter your location</label>
            <input
              type="text"
              id="location-input"
              value={locationInput}
              onChange={(evt) => setLocationInput(evt.target.value)}
            />
            <input className="main-btn btn" type="submit" />
            <button className="main-btn btn" onClick={() => setLocationEdit(false)}>Cancel</button>
          </form>
          :
          <button className="main-btn btn" onClick={() => setLocationEdit(true)}>Location</button>
        }
      </div>

    </div>
  )
}

export default UserDetails;