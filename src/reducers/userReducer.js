import {GET_USERS, REMOVE_USER} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload
    // case GET_PROJECT:
    //   return {
    //     ...state,
    //     project: action.payload
    //   };
    //
    case REMOVE_USER:
      return state.filter(
        user => user.id !== action.payload.id
      )

    default:
      return state;
  }
}
