import { userConstants } from '../constants'

const initialState = {
  isFetching: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.READALL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        all: undefined
      }
    case userConstants.READALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: action.response
      }
    case userConstants.CREATE_REQUEST:
    case userConstants.UPDATE_REQUEST:
    case userConstants.READ_REQUEST:
    case userConstants.DELETE_REQUEST:
    case userConstants.UPLOAD_AVATAR_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case userConstants.CREATE_SUCCESS:
    case userConstants.UPDATE_SUCCESS:
    case userConstants.READ_SUCCESS:
    case userConstants.DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        current: action.response
      }
    case userConstants.UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        current: action.response
      }
    case userConstants.CREATE_FAILURE:
    case userConstants.UPDATE_FAILURE:
    case userConstants.READ_FAILURE:
    case userConstants.READALL_FAILURE:
    case userConstants.DELETE_FAILURE:
    case userConstants.UPLOAD_AVATAR_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

export default user