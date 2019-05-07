import {GET_REPORT} from "../actions/types";

const initialState = [];

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case GET_REPORT:
      return payload;

    default:
      return state;
  }
}
