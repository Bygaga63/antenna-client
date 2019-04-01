import {ADD_TASK, GET_TASK_LIST} from "./types";
import axios from "axios";


export const getTaskList = () => async dispatch => {
  const res = await axios.get("/api/task");
  dispatch({
    type: GET_TASK_LIST,
    payload: res.data
  });
};


export const addTask = (task) => async dispatch => {
  const res = await axios.post("/api/task", {task});
  dispatch({
    type: ADD_TASK,
    payload: res.data
  });
};

