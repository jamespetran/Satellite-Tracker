import { useSelector, useDispatch } from 'react-redux';

function TLEView() {
  const satellites = useSelector(store => store.satellites);
  const favorites = useSelector(store => store.favorites);
  const page = useSelector(store => store.page)
  const dispatch = useDispatch();
  
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

  const handleSat = (satellite) => {
    // console.log('in handleSat',satellite)
    dispatch({ type: 'ADD_TO_FAVES', payload: satellite })
  }

  return (
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
      <h4 className="centered">Click on a satellite to add it to your favorites.
        Lime green orbiters are already selected!</h4>
      <table className="sat-table">
        <tbody>
          {satellites.map(satellite => {
            return (<tr key={satellite.satelliteId}>
              <td className="tle td">
                <button
                  className={favorites.map(favorite => {
                    if (favorite.noradID === satellite.satelliteId) {
                      return " in-fav btn satellite-btn ";
                    }
                    return " btn satellite-btn "
                  })}
                  onClick={() => handleSat(satellite)}
                >
                  {satellite.name}

                </button>

              </td>
            </tr>)
          })}
        </tbody>
      </table>
      <div id="next-prev-container">
        <button
          className="btn next-prev"
          onClick={() => tle('prev')}
        >
          Prev
        </button>
          <span style={{margin: "auto", marginLeft: "10px", marginRight: "10px" }}>Page {page.tle}</span>
        <button
          className="btn next-prev"
          onClick={() => tle('next')}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TLEView;