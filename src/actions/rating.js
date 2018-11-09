import axios from 'axios'
import { ratingConstants } from '../constants'
import config from '../config/config'
import { userActions } from './user'

export const ratingActions = {
  create
}

function create(token, user_id, recording_id, val) {
  let rating = {
    amount: val,
    user_id: user_id,
    recording_id: recording_id
  }
  return {
    types: [
      ratingConstants.CREATE_REQUEST,
      ratingConstants.CREATE_SUCCESS,
      ratingConstants.CREATE_FAILURE
    ],
    callAPI: () =>
      axios
        .post(
          config.API_URL + 'ratings',
          { rating },
          { headers: { Authorization: 'Bearer ' + token } }
        )
        .then(res => res.data)
  }
}
