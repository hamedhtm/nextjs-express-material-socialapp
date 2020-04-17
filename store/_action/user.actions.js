import axios from "axios";
import actionType from "../_type/user.type";
import Router from "next/router";

const requestRegister = () => {
  return { type: actionType.REGISTER_REQUEST };
};
const successRegister = () => {
  return { type: actionType.REGISTER_SUCCESS };
};
const failureRegister = (error) => {
  return { type: actionType.REGISTER_FAILURE, error };
};

export const register = (user) => async (dispatch) => {
  dispatch(requestRegister());
  await axios
    .post("/api/auth/signup", user)
    .then(() => {
      dispatch(successRegister());
    })
    .catch((err) => {
      const error = (err.response && err.response.data) || err.message;
      dispatch(failureRegister(error));
      throw new Error(error);
    });
};

const requestLogin = () => {
  return {
    type: actionType.LOGIN_REQUEST,
  };
};
const successLogin = (user) => {
  return { type: actionType.LOGIN_SUCCESS, user };
};
const failureLogin = (error) => {
  return { type: actionType.LOGIN_FAILURE, error };
};

export const login = (data) => async (dispatch) => {
  dispatch(requestLogin());
  await axios
    .post("/api/auth/signin", data)
    .then((res) => {
      dispatch(successLogin(res.data));
      Router.push("/");
    })
    .catch((err) => {
      const error = (err.response && err.response.data) || err.message;
      dispatch(failureLogin(error));
      throw new Error(error);
    });
};

const requestLogOut = () => {
  return {
    type: actionType.LOGOUT_REQUEST,
  };
};
const successLogOut = () => {
  return { type: actionType.LOGOUT_SUCCESS };
};

export const logout = () => (dispatch) => {
  dispatch(requestLogOut());
  axios.get("/api/auth/signout").then(() => dispatch(successLogOut()));
  Router.replace("/signin");
};

export const updateCurrentUser = (user) => ({
  type: actionType.UPDATE_CURRENT_USER,
  user,
});
