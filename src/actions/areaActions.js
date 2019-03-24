import {GET_AREAS, REMOVE_AREA} from "./types";
import axios from "axios";


export const getAreas = () => async dispatch => {
  const res = await axios.get("/api/areas");
  dispatch({
    type: GET_AREAS,
    payload: res.data
  });
  return res.data;
};


export const removeArea = (area) => async dispatch => {
  const res = await axios.delete("/api/areas/" + area.id);
  dispatch({
    type: REMOVE_AREA,
    payload: area
  });
  return res.data;
};