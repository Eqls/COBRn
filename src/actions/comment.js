import axios from 'axios'
import { commentConstants } from '../constants'
import config from '../config/config'
import { userActions } from './user'

export const commentActions = {
  create
}

function create(token, user_id, recording_id, text) {
  let comment = {
    message: text,
    user_id: user_id,
    recording_id: recording_id
  }
  return {
    types: [
      commentConstants.CREATE_REQUEST,
      commentConstants.CREATE_SUCCESS,
      commentConstants.CREATE_FAILURE
    ],
    callAPI: () =>
      axios
        .post(
          config.API_URL + 'comments',
          { comment },
          { headers: { Authorization: 'Bearer ' + token } }
        )
        .then(res => res.data),
    onSuccess: userActions.read(user_id, token)
  }
}
