const displayedReducer = (state = {name: "Select a Satellite to Display"}, action) => {
  switch (action.type) {
    case 'SET_DISPLAYED':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default displayedReducer;
