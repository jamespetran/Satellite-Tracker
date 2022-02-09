const subHeadReducer = (state = {name: ''}, action) => {
  switch (action.type) {
    case 'SET_SUBHEAD_SAT':
      return {...state, name: action.payload};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default subHeadReducer;
