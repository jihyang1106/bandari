const initialState = {
  user: {
    isLogin: false,
  },
};

function setUserInfo(data) {
  return {
    type: 'SETUSERINFO',
    data,
  };
}

function logout() {
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
          isLogin: action.isLogin,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          isLogin: false,
        },
      };
    default:
      return state;
  }
}

export default user;
export { setUserInfo, logout };
