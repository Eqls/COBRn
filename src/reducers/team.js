import { teamConstants } from "../constants";

const initialState = {
  isFetching: false
};

const team = (state = initialState, action) => {
  switch (action.type) {
    case teamConstants.READALL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        all: undefined
      };
    case teamConstants.READALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: action.response
      };
    case teamConstants.READ_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        current: action.response
      };
    case teamConstants.READ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        current: action.response
      };
    default:
      return state;
  }
};

export default team;
