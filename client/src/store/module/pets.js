const initialState = {
  pets: [],
};

function setPets(pet) {
  console.log('pet', pet);
  return {
    type: 'SETPETS',
    pet,
  };
}

function pets(state = initialState, action) {
  switch (('pet 액션 타입 :', action.type)) {
    case 'SETPETS':
      const indexpets = state.pets.push(action.pet);
      return { ...state, pets: indexpets };
    // return {
    //   ...state,
    //   pets: {
    //     data: action.pet,
    //   },
    // };
    default:
      return state;
  }
}

export default pets;
export { setPets };
