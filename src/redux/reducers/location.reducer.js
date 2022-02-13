const locationReducer = (state = {lat: 44.978435, lng: -93.263541, formattedAddress: null}, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return action.payload;
    default:
      return state;
  }
};

export default locationReducer;