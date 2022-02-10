import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function Location() {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();


  return (
    <h3>
      location
      {/* Location is {geolocation.latitude}, {geolocation.longitude} */}
    </h3>
  )
}


export default Location;