import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import breakdownTypeReducer from "./breakdownTypeReducer";
import areaReducer from "./areaReducer";

export default combineReducers({
  errors: errorReducer,
  // project: projectReducer,
  // backlog: backlogReducer,
  users: userReducer,
  breakdownType: breakdownTypeReducer,
  area: areaReducer,
  security: securityReducer
});


