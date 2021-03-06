import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Location() {
  const location = useSelector(store => store.location)
  const dispatch = useDispatch();

  const [locationInput, setLocationInput] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch({ type: "QUERY_LOCATION", payload: locationInput })
  }

  const geolocation = (evt) => {
    evt.preventDefault();
    // console.log('in geolocation')
    dispatch({ type: "INIT_GEOLOCATION" })
    // navigator.geolocation.getCurrentPosition(sendPosition);
  }

  return (
    <div className="main-content">
      <div id="subheader">
        <h2>Enter Your Location</h2>
      </div>

      <h3>
        Location is {location.lat} {location.lng}
        <br />
        {location.formattedAddress}
      </h3>
      <form onSubmit={(evt) => handleSubmit(evt)}>
        <p>Search for your location</p>
        <input type="text" value={locationInput} onChange={(evt) => setLocationInput(evt.target.value)} />
        <input type="Submit" />
      </form>

      <p>Or click this button to allow your browser to geolocate for you</p>
      <button onClick={(evt) => geolocation(evt)}>Geolocate</button>
      {/* Location is {geolocation.latitude} - {geolocation.longitude} */}
    </div>
  )

}


export default Location;