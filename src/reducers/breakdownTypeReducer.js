import {GET_BREAKDOWN_TYPES, REMOVE_BREAKDOWN_TYPE} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BREAKDOWN_TYPES:
      return action.payload

    // case GET_PROJECT:
    //   return {
    //     ...state,
    //     project: action.payload
    //   };
    //
    case REMOVE_BREAKDOWN_TYPE: {
      return state.filter(
        breakdown => breakdown.id !== action.payload.id
      )

    }

    default:
      return state;
  }
}
