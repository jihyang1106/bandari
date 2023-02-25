const initialState = {
  switchState: 'basic',
};

function setStatePuppy() {
  return {
    type: 'switch/SETSTATEPUPPY',
  };
}

function setStateCat() {
  return {
    type: 'switch/SETSTATECAT',
  };
}

function setStateBasic() {
  return {
    type: 'switch/SETSTATEBASIC',
  };
}

function typeSwitch(state = initialState, action) {
  switch (action.type) {
    case 'switch/SETSTATEBASIC':
      return {
        switchState: 'basic',
      };
    case 'switch/SETSTATEPUPPY':
      return {
        switchState: 'puppy',
      };
    case 'switch/SETSTATECAT':
      return {
        switchState: 'cat',
      };
    default:
      return state;
  }
}

export default typeSwitch;
export { setStateBasic, setStateCat, setStatePuppy };
