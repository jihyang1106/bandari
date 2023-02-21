const initialState = {
  pets: [],
};

function setPets(pet) {
  console.log('pet', pet);
  return {
    type: 'pets/SETPETS',
    pet,
  };
}

function pets(state = initialState, action) {
  switch (('pet 액션 타입 :', action.type)) {
    case 'pets/SETPETS':
    // const indexpets = state.pets.push(action.pet);
    // return { ...state, pets: indexpets };
    // return {
    //   ...state,
    //   pets : state.pets.concat({
    //   action.data
    //   })
    //   }
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
