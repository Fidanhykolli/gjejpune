const initialState = {
  user: null,
  loginError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loginError: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loginError: null,
      };
    case "SET_LOGIN_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
