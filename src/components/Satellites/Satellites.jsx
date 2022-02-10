import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Satellites.css';

function Satellites() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' })
  }, [])

  const satellites = useSelector(store => store.satellites);
  const favorites = useSelector(store => store.favorites);
  const page = useSelector(store => store.page);

  // const [favMode, setMode] = useState(true);

  const setDisplayed = () => {
    console.log('in setDisplayed');
  } // end setDisplayed

  const populateSatellites = () => {
    // if satellites state is empty array, then fetch satellites list
    satellites.length === 0 &&
      dispatch({ type: "FETCH_SAT_TLE", payload: page.tle });
  } // end populateSatellites

  const tle = (direction) => {
    if (direction === 'next') {
      dispatch({ type: 'NEXT_TLE_PAGE' });
      dispatch({ type: 'FETCH_SAT_TLE', payload: Number(page.tle) + 1 });
    } else if (direction === 'prev') {
      dispatch({ type: 'PREV_TLE_PAGE' });
      if (page.tle > 1) {
        dispatch({ type: 'FETCH_SAT_TLE', payload: page.tle - 1 });
      }
    }


  } // end tle

  useEffect(() => {
    populateSatellites()
  }, [])


  return (
    <div className="main-content container">

      {page.faveMode === true ?
        <div>
          {/* FAVORITES MODE */}
          <div id="subheader">
            <h2>Stored Satellites </h2>
          </div>
          <div className="centered top-button">
            <button
              className="btn"
              onClick={() => dispatch({ type: 'POP_MODE' })}
            >
              Switch to popular satellites
            </button>
          </div>
          {/* TABLE TO DISPLAY FAVORITES */}
          <table className="sat-table">
            <tbody>
              {favorites.map(favorite => {
                return (
                  <tr key="favorite.noradID">
                    <td>
                      <button
                        className={favorite.displayed === true ? "btn displayed" : "btn"}
                        onClick={() => setDisplayed(favorite.noradID)}
                      >
                        {favorite.name}{favorite.displayed === true && " (Shown)"}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        :
        <div>
          {/* API TLE MODE */}
          <div id="subheader">
            <h2>Popular Satellites </h2>
          </div>
          <div className="centered top-button">
            <button
              className="btn"
              onClick={() => dispatch({ type: 'FAV_MODE' })}
            >
              Switch to saved satellites
            </button>
          </div>
          {/* TABLE TO DISPLAY API RESULTS */}
          <table className="sat-table">
            {satellites.map(satellite => {
              return (<tr key={satellite.satelliteId}>
                <td>
                  <button
                    className="btn satellite-btn"
                    onClick={() => handleSat(satellite)}
                  >
                    {satellite.name}
                    {favorites.map(favorite => {
                      if (favorite.noradID === satellite.satelliteId) {
                        return <span> IN FAVORITES </span>
                      }
                    })}
                  </button>

                </td>
              </tr>)
            })
            }
          </table>
          <div id="next-prev-container">
            <button
              className="btn next-prev"
              onClick={() => tle('prev')}
            >
              Prev
            </button>

            <button
              className="btn next-prev"
              onClick={() => tle('next')}
            >
              Next
            </button>
          </div>
        </div>
      }

    </div>
  )
}

export default Satellites;