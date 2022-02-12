const displayedReducer = (state = {
  name: "Select a Satellite to Display",
  line1: "1 25544U 98067A   22043.55847865  .00011256  00000+0  20676-3 0  9997",
  line2: "2 25544  51.6418 233.7857 0005922 124.4921 351.1177 15.49734813325856",
}, action) => {
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
