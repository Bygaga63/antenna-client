import {GET_REPORT} from "./types";
import axios from "axios/index";

export const getReports = (report) => async dispatch => {
  const res = await axios.post("/api/report", report);
  dispatch({
    type: GET_REPORT,
    payload: res.data
  });
};

export const downloadReports = () => async dispatch => {
  window.location.href = "http://127.0.0.1:8080/api/report";
  // const res = await axios.get("/api/report");
  // dispatch({
  //   type: GET_REPORT,
  //   payload: res.data
  // });
};
