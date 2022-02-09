import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Location() {

  if (!navigator.geolocation) {
    console.error(`Your browser doesn't support Geolocation`);
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }


  return (
    <h3>
      Location!
    </h3>
  )
}

// have to define separate functions, can't do ~const x = () => {}~ 
// because .geolocation.getCurrentPosition requires defined external functions
function onSuccess(position) {
  const {
    latitude,
    longitude
  } = position.coords;
  console.log(`Your location is: ${latitude}, ${longitude}`)

}

function onError() {
  console.error("error in getting locaiton")
}

export default Location;