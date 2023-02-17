const initialState = {
  pets: null,
};

function setPets(pet) {
  return {
    type: 'SETPETS',
    pet,
  };
}

function pets(state = initialState, action) {
  switch (action.type) {
    case 'SETPETS':
      return {};
    default:
      return state;
  }
}

export default pets;
export { setPets };
