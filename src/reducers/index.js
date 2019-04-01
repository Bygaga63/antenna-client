import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import breakdownTypeReducer from "./breakdownTypeReducer";
import areaReducer from "./areaReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  errors: errorReducer,
  // project: projectReducer,
  // backlog: backlogReducer,
  tasks: tasksReducer,
  users: userReducer,
  breakdownType: breakdownTypeReducer,
  area: areaReducer,
  security: securityReducer
});


