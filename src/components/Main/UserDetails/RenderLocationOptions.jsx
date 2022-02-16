import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import LocateMe from './LocateMe'

function RenderLocationOptions() {
  const history = useHistory();
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  const goToLocationPage = () => {
    history.push('/location');
  }

  const [locationEdit, setLocationEdit] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  const handleLocationSubmit = async (evt) => {
    evt.preventDefault();
    dispatch({
      type: "QUERY_LOCATION",
      payload: { query: locationInput, locationSave: user.saveLocation }
    })
    if (user.saveLocation) {
      console.log("to be saved...")
    }
    setLocationEdit(false);
    setLocationInput('');
  }


  switch (locationEdit) {
    case false: 
    return (
    <button className="main-btn btn" onClick={() => setLocationEdit(true)}>Location</button>
    )
    case true:
      return (
        <div>
          <LocateMe
            setLocationEdit={setLocationEdit}
          />
          <form id="location-submit-form" onSubmit={(evt) => handleLocationSubmit(evt)}>
            <label htmlFor="location-input" >Enter your location</label>
            <input
              type="text"
              id="location-input"
              value={locationInput}
              onChange={(evt) => setLocationInput(evt.target.value)}
            />
            <div id="location-btn-container">
              <input className="half-btn btn" type="submit" />
              <button className="half-btn btn" onClick={() => setLocationEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      );
    case 'loading': 
      return (
      <div className="centered" style={{marginBottom: "10vh"}}> Loading <img src="public/images/loading.gif" /> </div>
      )
  }
}


export default RenderLocationOptions;