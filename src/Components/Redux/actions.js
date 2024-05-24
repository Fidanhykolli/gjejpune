export const login = (userData) => {
  return {
    type: "LOGIN",
    payload: userData,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setLoginError = (error) => {
  return {
    type: "SET_LOGIN_ERROR",
    payload: error,
  };
};

export const addFavoriteJob = (job) => {
  return {
    type: "ADD_FAVORITE_JOB",
    payload: job,
  };
};
