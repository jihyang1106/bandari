const initialState = {
  switchState: 'basic',
};

function setStatePuppy() {
  return {
    type: 'SETSTATEPUPPY',
  };
}

function setStateCat() {
  return {
    type: 'SETSTATECAT',
  };
}

function setStateBasic() {
  return {
    type: 'SETSTATEBASIC',
  };
}

function typeSwitch(state = initialState, action) {
  switch (action.type) {
    case 'SETSTATEBASIC':
      return {
        switchState: 'basic',
      };
    case 'SETSTATEPUPPY':
      return {
        switchState: 'puppy',
      };
    case 'SETSTATECAT':
      return {
        switchState: 'cat',
      };
    default:
      return state;
  }
}

export default typeSwitch;
export { setStateBasic, setStateCat, setStatePuppy };
