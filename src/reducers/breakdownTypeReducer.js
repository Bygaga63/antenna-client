import {ADD_BREAKDOWN_TYPE, GET_BREAKDOWN_TYPES, REMOVE_BREAKDOWN_TYPE} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BREAKDOWN_TYPES:
      return action.payload

    case ADD_BREAKDOWN_TYPE:
      return [
        ...state, action.payload
      ];


    case REMOVE_BREAKDOWN_TYPE:
      return state.filter(
        breakdown => breakdown.id !== action.payload.id
      )

    default:
      return state;
  }
}
