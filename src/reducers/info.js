import { infoConstants } from "../constants";

const initialState = {
  isFetching: false
};

const info = (state = initialState, action) => {
  switch (action.type) {
    case infoConstants.READ_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        current: action.response
      };
    case infoConstants.READ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        current: action.response
      };
    case infoConstants.READ_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
};
export default info;
