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

  const [favMode, setMode] = useState(true);

  const setDisplayed = () => {
    
  }


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
          <table>
            {favorites.map(favorite => {
              return (
                <tr>
                  <button
                    key="favorite.noradID"
                    className={favorite.displayed === true ? "btn displayed" : "btn"}
                    onClick={() => setDisplayed(favorite.noradID)}
                    >
                    {favorite.name}{favorite.displayed === true && " (Shown)"}
                  </button>
                </tr>
              )
            })}
          </table>
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