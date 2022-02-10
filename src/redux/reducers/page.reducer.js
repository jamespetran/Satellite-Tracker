const displayedReducer = (state = { tle: 1, fav: 1 }, action) => {
  switch (action.type) {
    case 'NEXT_TLE_PAGE':
      return { ...state, tle: Number(state.tle) + 1 };
    case 'PREV_TLE_PAGE':
      // no negative numbers or zero allowed ~ min allowed state = 1
      return (
        state.tle === 1 ?
          state :
          { ...state, tle: Number(state.tle) - 1 }
      );
    case 'NEXT_FAV_PAGE':
      return { ...state, fav: Number(state.fav) + 1 };
    case 'PREV_FAV_PAGE':
      // no negative numbers or zero allowed ~ min allowed state = 1  
      return (
        state.fav === 1 ?
          state :
          { ...state, fav: Number(state.fav) - 1 }
      );
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default displayedReducer;