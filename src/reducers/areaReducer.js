import {GET_AREAS, REMOVE_AREA} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AREAS:
      return action.payload

    // case GET_PROJECT:
    //   return {
    //     ...state,
    //     project: action.payload
    //   };
    //
    case REMOVE_AREA:
      return state.filter(
        area => area.id !== action.payload.id
      )

    default:
      return state;
  }
}
