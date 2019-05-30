import {GET_REPORT} from "./types";
import axios from "axios/index";

export const getReports = (report) => async dispatch => {
  const res = await axios.post("/api/report", report);
  dispatch({
    type: GET_REPORT,
    payload: res.data
  });
};

export const downloadReports = (reportInfo) => async dispatch => {
  const link = document.createElement("a");
  link.download = "download";
  link.href = `http://localhost:8080/api/report/${reportInfo}`;
  link.click();
};
