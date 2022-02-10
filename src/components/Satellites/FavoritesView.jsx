import { useSelector, useDispatch } from 'react-redux';

function FavoritesView() {
  const favorites = useSelector(store => store.favorites);

  const dispatch = useDispatch();


  const setDisplayed = () => {
    console.log('in setDisplayed');
  } // end setDisplayed

  const handleDelete = (favorite) => {
    dispatch({
      type: 'DELETE_FAVORITE',
      payload: favorite
    })
  }

  return (
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
              <tr key={favorite.noradID}>
                <td>
                  <button
                    className={favorite.displayed === true ? "fav btn displayed" : "fav btn"}
                    onClick={() => setDisplayed(favorite.noradID)}
                  >
                    {favorite.name}{favorite.displayed === true && " (Shown)"}
                  </button>
                  <button
                    className="btn delete"
                    onClick={()=> handleDelete(favorite)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritesView;