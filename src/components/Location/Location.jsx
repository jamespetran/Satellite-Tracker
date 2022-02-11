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
      <input type="text" value={locationInput} onChange={(evt) => setLocationInput(evt.target.value)} />
      <input type="Submit" />
      </form>
      {/* Location is {geolocation.latitude} - {geolocation.longitude} */}
    </div>
  )

}


export default Location;