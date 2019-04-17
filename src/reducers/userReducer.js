import {EDIT_USER, GET_USERS, REMOVE_USER} from "../actions/types";

const initialState = [];

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case GET_USERS:
      return payload

    case EDIT_USER:
      return state.map(user => {
        if (user.id === payload.id) {
          return payload;
        }
        return user;
      })

    case REMOVE_USER:
      return state.filter(
        user => user.id !== payload.id
      )

    default:
      return state;
  }
}
