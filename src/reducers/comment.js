import { commentConstants } from "../constants";

const initialState = {
  isFetching: false
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case commentConstants.CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      };
    case commentConstants.CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined
      };
    default:
      return state;
  }
};

export default comment;
