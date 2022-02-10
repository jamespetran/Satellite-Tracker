import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Satellites.css';

import FavoritesView from './FavoritesView';
import TLEView from './TLEView';

function Satellites() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' })
  }, [])

  const satellites = useSelector(store => store.satellites);
  const page = useSelector(store => store.page);

  const populateSatellites = () => {
    // if satellites state is empty array, then fetch satellites list
    satellites.length === 0 &&
      dispatch({ type: "FETCH_SAT_TLE", payload: page.tle });
  } // end populateSatellites



  useEffect(() => {
    populateSatellites()
  }, [])


  return (
    <div className="main-content container">

      {page.faveMode === true ?
        <FavoritesView />
        :
        <TLEView />
      }
    </div>
  )
}

export default Satellites;