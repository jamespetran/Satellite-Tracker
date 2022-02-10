import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function Satellites() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' })
  }, [])

  const satellites = useSelector(store => store.satellites);
  const favorites = useSelector(store => store.favorites);

  const [favMode, setMode] = useState(true);


  return (
    <div className="main-content container">

      {favMode === true ?
        <div>
          <div id="subheader">
            <h2>Stored Satellites </h2>
          </div>
          <div className="centered top-button">
            <button
              className="btn"
              onClick={() => setMode(false)}
            >
              Switch to popular satellites
            </button>
          </div>
          <div>
            {favorites.map(favorite => {
              {/* const satName = dispatch({
                type: "GET_SAT_NAME",
                payload: favorite.noradID
              }) */}

              return (
                <button key="favorite.noradID" className="btn">{favorite.name}</button>
              )
            })}
          </div>
        </div>
        :
        <div>
          <div id="subheader">
            <h2>Popular Satellites </h2>
          </div>
          <div className="centered top-button">
            <button
              className="btn"
              onClick={() => setMode(true)}
            >
              Switch to saved satellites
            </button>
          </div>
          <table>
            {satellites.map(satellite => {
              return (<tr>
                <button
                  className="btn satellite-btn"
                  key={satellite.satelliteId}
                  onClick={() => handleSat(satellite)}
                >
                  {satellite.name}
                </button>
              </tr>)
            })
            }
          </table>
        </div>
      }

    </div>
  )
}

export default Satellites;