const initialState = {
  pets: [],
};

function setPets(petId) {
  console.log('pet', petId);
  return {
    type: 'pets/SETPETS',
    petId,
  };
}

function pets(state = initialState, action) {
  switch (('pet 액션 타입 :', action.type)) {
    case 'pets/SETPETS':
      return {
        ...state,
        pets: state.pets.concat(action.petId),
      };
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
