import { FRIEND_GET_SUCCESS } from "../types/messengerType";

const messengerState = {
  friends: [],
};

const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;
  if (type === FRIEND_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  return state;
};

export default messengerReducer;
