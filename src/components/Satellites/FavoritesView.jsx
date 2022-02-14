import { useSelector, useDispatch } from 'react-redux';

function FavoritesView() {
  const favorites = useSelector(store => store.favorites);
  const displayed = useSelector(store => store.displayed);

  const dispatch = useDispatch();


  const setDisplayed = (id) => {
    console.log('in setDisplayed');
    dispatch({
      type: 'ADD_DISPLAYED',
      payload: id
    });
  } // end setDisplayed

  const handleDelete = (favorite) => {
    if (favorite.id === displayed.id) {
      console.log('error: cannot delete currently displayed satellite');
      return false;
    }
    dispatch({
      type: 'DELETE_FAVORITE',
      payload: favorite
    })
  }

  return (
    <div>
      {/* FAVORITES MODE */}
      <div id="subheader">
        <h2>Select Satellite to Display </h2>
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
                    className={favorite.name === displayed.name ? "displayed fav btn" : "fav btn"}
                    onClick={() => setDisplayed(favorite.noradID)}
                  >
                    {favorite.name}{favorite.name === displayed.name && " (Shown)"}
                  </button>
                  {favorite.name !== displayed.name &&
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(favorite)}
                    >
                      Delete
                    </button>
                  }
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