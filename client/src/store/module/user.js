const initialState = {
  user: {
    isLoggedIn: false,
    data: null,
  },
};

function setUserInfo(userInfo, isLoggedIn) {
  return {
    type: 'SETUSERINFO',
    userInfo,
    isLoggedIn,
  };
}

function logout() {
  sessionStorage.clear();
  return {
    type: 'LOGOUT',
  };
}

function user(state = initialState, action) {
  switch (action.type) {
    case 'SETUSERINFO':
      return {
        ...state,
        user: {
          isLoggedIn: action.isLoggedIn,
          data: action.userInfo,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          isLoggedIn: false,
          data: null,
        },
      };
    default:
      return state;
  }
}

export default user;
export { setUserInfo, logout };
