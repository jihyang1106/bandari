const initialState = {
  pets: null,
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
      return {};
    default:
      return state;
  }
}

export default pets;
export { setPets };
