import {ADD_AREA, GET_AREAS, REMOVE_AREA} from "./types";
import axios from "axios";


export const getAreas = () => async dispatch => {
  const res = await axios.get("/api/areas");
  dispatch({
    type: GET_AREAS,
    payload: res.data
  });
};


export const removeArea = (area) => async dispatch => {
  const res = await axios.delete("/api/areas/" + area.id);
  dispatch({
    type: REMOVE_AREA,
    payload: area
  });
  return res.data;
};


export const addArea = (area) => async dispatch => {
  const res = await axios.post("/api/areas");
  dispatch({
    type: ADD_AREA,
    payload: area
  });
  return res.data;
};