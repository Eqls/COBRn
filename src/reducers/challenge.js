import { challengeConstants } from '../constants'

const initialState = {
  isFetching: false
}

const challenge = (state = initialState, action) => {
  switch (action.type) {
    case challengeConstants.READALL_GROUPS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        allGroups: undefined
      }
    case challengeConstants.READALL_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        all: undefined
      }
    case challengeConstants.READALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: action.response.data
      }
    case challengeConstants.READALL_GROUPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        allGroups: action.response.data
      }
    case challengeConstants.READALL_FAILURE:
    case challengeConstants.READALL_GROUPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        allGroups: undefined
      }
    default:
      return state
  }
}

export default challenge
