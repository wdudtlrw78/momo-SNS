const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
  },

  post: {
    mainPosts: [],
  },
};

export function loginAction(data) {
  return {
    type: 'LOG_IN',
    data,
  };
}

export function logoutAction(data) {
  return {
    type: 'LOG_OUT',
    data,
  };
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
