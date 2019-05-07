import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import breakdownTypeReducer from "./breakdownTypeReducer";
import areaReducer from "./areaReducer";
import tasksReducer from "./tasksReducer";
import reportReducer from "./reportReducer";

export default combineReducers({
  errors: errorReducer,
  reports: reportReducer,
  tasks: tasksReducer,
  users: userReducer,
  breakdownType: breakdownTypeReducer,
  area: areaReducer,
  security: securityReducer
});


