import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function Location() {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();


  return (
    <h3>
      Location is {geolocation.latitude}, {geolocation.longitude}
    </h3>
  )
}

// have to define separate functions, can't do ~const x = () => {}~ 
// because .geolocation.getCurrentPosition requires defined external functions

function onSuccess(position) {
  // const dispatch = useDispatch();

  const {
    latitude,
    longitude
  } = position.coords;
  // dispatch({
  //   type: 'SET_LOCATION',
  //   payload: { latitude, longitude }
  // })
  // if 
  console.log(`Your location is: ${latitude}, ${longitude}`)

}

function onError() {
  console.error("error in getting locaiton")
}

export default Location;