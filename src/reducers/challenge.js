import { challengeConstants } from "../constants";

const initialState = {
  isFetching: false
};

const challenge = (state = initialState, action) => {
  switch (action.type) {
    case challengeConstants.READALL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        all: undefined
      };
    case challengeConstants.READALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: action.response.data
      };
    default:
      return state;
  }
};

export default challenge;
