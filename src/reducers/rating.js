import { ratingConstants } from '../constants'

const initialState = {
  isFetching: false
}

const rating = (state = initialState, action) => {
  switch (action.type) {
    case ratingConstants.CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case ratingConstants.CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: undefined
      }
    default:
      return state
  }
}

export default rating
