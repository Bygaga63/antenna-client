import {ADD_AREA, GET_AREAS, REMOVE_AREA} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AREAS:
      return action.payload

    case ADD_AREA:
      return [
        ...state, action.payload
      ];

    case REMOVE_AREA:
      return state.filter(
        area => area.id !== action.payload.id
      )

    default:
      return state;
  }
}
