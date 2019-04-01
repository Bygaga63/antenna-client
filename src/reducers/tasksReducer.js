import {GET_TASK_LIST} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_LIST:
      return action.payload

    default:
      return state;
  }
}
