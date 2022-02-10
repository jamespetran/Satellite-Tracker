const satelliteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SATELLITES_LIST':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default satelliteReducer;
