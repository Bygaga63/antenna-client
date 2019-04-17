import axios from "axios";
import {EDIT_USER, GET_ERRORS, SET_CURRENT_USER} from "./types";
import AuthService from "../service/AuthService";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/settings")
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const editUser = (user) => async dispatch => {
  try {
    await axios.put("/api/users", user);
    dispatch({
      type: EDIT_USER,
      payload: user
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios.post("/api/users/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    AuthService.setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// export const loadUser

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  AuthService.setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};

