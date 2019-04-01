import {ADD_BREAKDOWN_TYPE, GET_BREAKDOWN_TYPES, REMOVE_BREAKDOWN_TYPE} from "./types";
import axios from "axios";


export const getBreakdownTypes = () => async dispatch => {
  const res = await axios.get("/api/breakdowns");
  dispatch({
    type: GET_BREAKDOWN_TYPES,
    payload: res.data
  });
  return res.data;
};


export const removeBreakdownType = (breakdown) => async dispatch => {
  const res = await axios.delete("/api/breakdowns/" + breakdown.id);
  dispatch({
    type: REMOVE_BREAKDOWN_TYPE,
    payload: breakdown
  });
  return res.data;
};


export const addBreakdownType = (type) => async dispatch => {
  const res = await axios.post("/api/breakdowns", {type});
  dispatch({
    type: ADD_BREAKDOWN_TYPE,
    payload: res.data
  });
};