export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpdata: {},
  loginData: {},
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
