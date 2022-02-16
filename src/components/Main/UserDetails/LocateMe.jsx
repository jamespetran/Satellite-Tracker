import { useDispatch } from 'react-redux';

function setCoordinates(position) {
  console.log('setCoordinates:', position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log("Latitude : " + latitude + " Longitude: " + longitude);
}

function LocateMe ({setLocationEdit}) {

  const dispatch = useDispatch();

  const geolocate = async () => {
    console.log('in geolocate');
    setLocationEdit("loading")
    navigator.geolocation.getCurrentPosition(setCoordinates = (position) => {
      // console.log('setCoordinates:', position);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("Latitude : " + lat + " Longitude: " + lng);    
      const latLng = { lat, lng };
      dispatch({ type: 'SET_LOCATION', payload: {...latLng, formattedAddress: null }});
      dispatch({ type: "QUERY_ADDRESS", payload: latLng });
      // getAddress(latLng)
      setLocationEdit(false);
    });
  }
  return (
    <div id="geolocate-component">
      <button
        className="main-btn btn"
        id="geolocate-btn"
        onClick={geolocate}
        >
          Locate Automatically
        </button>
    </div>
  )
}
export default LocateMe;