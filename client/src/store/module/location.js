const initialState = {
  haveLocation: false,
  userLocation: null,
};

function setUserLocation(userLocation, haveLocation) {
  return {
    type: 'SETUSERLOCATION',
    userLocation,
    haveLocation,
  };
}

function location(state = initialState, action) {
  switch (action.type) {
    case 'SETUSERLOCATION':
      return {
        ...state,
        haveLocation: action.haveLocation,
        userLocation: action.userLocation,
      };
    default:
      return state;
  }
}

export default location;
export { setUserLocation };
