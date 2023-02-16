const initialState = {
  switchState: 'basic',
};

function setSatatePeed() {
  return {
    type: 'SETSTATEPEED',
  };
}

function setStateSnack() {
  return {
    type: 'SETSTATESNACK',
  };
}

function setStateProduct() {
  return {
    type: 'SETSATEPRODUCT',
  };
}

function setStateBasic() {
  return {
    type: 'SETSTATEBASIC',
  };
}

function sellCategorySwitch(state = initialState, action) {
  switch (action.type) {
    case 'SETSTATEBASIC':
      return {
        switchState: 'basic',
      };
    case 'SETSTATEPEED':
      return {
        switchState: 'peed',
      };
    case 'SETSTATESNACK':
      return {
        switchState: 'snack',
      };
    case 'SETSATEPRODUCT':
      return {
        switchState: 'product',
      };
    default:
      return state;
  }
}

export default sellCategorySwitch;
export { setStateBasic, setSatatePeed, setStateSnack, setStateProduct };
