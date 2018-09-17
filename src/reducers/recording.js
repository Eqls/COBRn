import { recordingConstants } from "../constants";

const initialState = {
  isFetching: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case recordingConstants.READALL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        all: undefined
      };
    case recordingConstants.READALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: action.response
      };
    case recordingConstants.CREATE_REQUEST:
    case recordingConstants.UPDATE_REQUEST:
    case recordingConstants.READ_REQUEST:
    case recordingConstants.DELETE_REQUEST:
    case recordingConstants.UPLOAD_AVATAR_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      };
    case recordingConstants.CREATE_SUCCESS:
    case recordingConstants.UPDATE_SUCCESS:
    case recordingConstants.READ_SUCCESS:
    case recordingConstants.DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        current: action.response
      };
    case recordingConstants.CREATE_FAILURE:
    case recordingConstants.UPDATE_FAILURE:
    case recordingConstants.READ_FAILURE:
    case recordingConstants.READALL_FAILURE:
    case recordingConstants.DELETE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default user;
