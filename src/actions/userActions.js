import {GET_USERS, REMOVE_USER} from "./types";
import axios from "axios";


export const getUsers = (role) => async dispatch => {
  const roleParam = role ? "?role=" + role : "";
  const res = await axios.get("/api/users" + roleParam);
  dispatch({
    type: GET_USERS,
    payload: res.data
  });
  return res.data;
};

export const removeUser = (user) => async dispatch => {
  const res = await axios.delete("/api/users/" + user.id);
  dispatch({
    type: REMOVE_USER,
    payload: user
  });
  return res.data;
};
