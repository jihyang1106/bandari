const initialState = {
  switchState: 'basic',
};

function setSatatePeed() {
  return {
    type: 'sell/SETSTATEPEED',
  };
}

function setStateSnack() {
  return {
    type: 'sell/SETSTATESNACK',
  };
}

function setStateProduct() {
  return {
    type: 'sell/SETSATEPRODUCT',
  };
}

function setStateBasic() {
  return {
    type: 'sell/SETSTATEBASIC',
  };
}

function sellCategorySwitch(state = initialState, action) {
  switch (action.type) {
    case 'sell/SETSTATEBASIC':
      return {
        ...state,
        switchState: 'basic',
      };
    case 'sell/SETSTATEPEED':
      return {
        ...state,
        switchState: 'peed',
      };
    case 'sell/SETSTATESNACK':
      return {
        ...state,
        switchState: 'snack',
      };
    case 'sell/SETSATEPRODUCT':
      return {
        ...state,
        switchState: 'product',
      };
    default:
      return state;
  }
}

export default sellCategorySwitch;
export { setStateBasic, setSatatePeed, setStateSnack, setStateProduct };
