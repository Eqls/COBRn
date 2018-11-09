
import { userConstants } from '../constants'

const initialState = {
  isLogged: false,
  isFetching: false,
  user: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLogged: true,
        error: undefined,
        user: action.response
      }
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLogged: false,
        user: {},
        error: action.error
      }
    case userConstants.LOGOUT:
      return {
        ...state,
        isFetching: false,
        isLogged: false,
        user: {},
      }
    default:
      return state
  }
}

export default auth