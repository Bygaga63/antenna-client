import {ADD_TASK, GET_TASK, GET_TASK_LIST, UPDATE_TASK} from "../actions/types";

const initialState = [];

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case GET_TASK_LIST:
      return payload;

    case GET_TASK:
      if (state.find(task => task.id === payload.id)) {
        return state.map(task => {
          if (task.id === payload.id) {
            return payload;
          }
          return task;
        })
      }
      return [...state, payload];

    case ADD_TASK:
      return [...state, payload];

    case UPDATE_TASK:
      return state.map(task => {

        if (task.id === payload.id) {
          return payload;
        }

        return task;
      });

    default:
      return state;
  }
}
