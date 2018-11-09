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
        allGroups: undefined,
        all: state.all ? [...state.all] : undefined
      }
    case challengeConstants.READALL_REQUEST:
    case challengeConstants.READALL_ORPHANS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        allGroups: state.allGroups ? [...state.allGroups] : undefined,
        all: undefined
      }
    case challengeConstants.READALL_SUCCESS:
    case challengeConstants.READALL_ORPHANS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: action.response.data,
        allGroups: state.allGroups ? [...state.allGroups] : undefined
      }
    case challengeConstants.READALL_GROUPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined,
        all: state.all ? [...state.all] : undefined,
        allGroups: action.response.data
      }
    case challengeConstants.READALL_FAILURE:
    case challengeConstants.READALL_ORPHANS_FAILURE:
    case challengeConstants.READALL_GROUPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        all: state.all ? [...state.all] : undefined,
        allGroups: state.allGroups ? [...state.allGroups] : undefined
      }
    default:
      return state
  }
}

export default challenge
