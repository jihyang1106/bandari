const initialState = {
  user: {
    isLogin: false,
    userName: false
  },
};

function setUserInfo(data) {
  return {
    type: 'SETUSERINFO',
    data
  };
}

// function logout() {
//   sessionStorage.clear();
//   return {
//     type: 'LOGOUT',
//   };
// }

function user(state = initialState, action) {
  switch (action.type) {
    case 'SETUSERINFO':
      return {
        ...state,
        user: {
          data: action.payload,
        },
      };
    // case 'LOGOUT':
    //   return {
    //     ...state,
    //     user: {
    //       isLoggedIn: false,
    //       data: null,
    //     },
    //   };
    default:
      return state;
  }
}

export default user;
export { setUserInfo };
