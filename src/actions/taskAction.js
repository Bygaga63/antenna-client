import {ADD_TASK, GET_ERRORS, GET_TASK, GET_TASK_LIST, UPDATE_TASK} from "./types";
import axios from "axios";


export const getTaskList = (closed) => async dispatch => {
  const res = await axios.get("/api/task?closed=" + closed);
  try {
    dispatch({
      type: GET_TASK_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

};

export const getTask = (taskId) => async dispatch => {
  const res = await axios.get("/api/task/" + taskId);
  try {
    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

};

export const addTask = (task, history) => async dispatch => {

  const res = await axios.post("/api/task", task);
  try {
    dispatch({
      type: ADD_TASK,
      payload: res.data
    });

    history.push("/dashboard")
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const updateTask = (task) => async dispatch => {

  await axios.put("/api/task", task);
  try {
    dispatch({
      type: UPDATE_TASK,
      payload: task
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }


};