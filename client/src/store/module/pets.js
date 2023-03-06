const initialState = {
  pets: [],
};

function setPets(pets) {
  return {
    type: 'pets/SETPETS',
    pets,
  };
}

function pets(state = initialState, action) {
  switch (('pet 액션 타입 :', action.type)) {
    case 'pets/SETPETS':
      return {
        ...state,
        pets: action.pets,
      };
    default:
      return state;
  }
}

export default pets;
export { setPets };
