import axios from 'axios'
import { challengeConstants } from '../constants'
import config from '../config/config'

export const challengeActions = {
  readAll,
  readAllGrouped,
  readAllOrphans
}

function readAll(challenge_group_id, token) {
  return {
    types: [
      challengeConstants.READALL_REQUEST,
      challengeConstants.READALL_SUCCESS,
      challengeConstants.READALL_FAILURE
    ],
    callAPI: () =>
      axios
        .post(
          config.API_URL + 'challenges',
          { challenge_group_id },
          {
            headers: { Authorization: 'Bearer ' + token }
          }
        )
        .then(res => res.data)
  }
}

function readAllOrphans(token) {
  return {
    types: [
      challengeConstants.READALL_ORPHANS_REQUEST,
      challengeConstants.READALL_ORPHANS_SUCCESS,
      challengeConstants.READALL_ORPHANS_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + 'challenges', {
          headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data)
  }
}

function readAllGrouped(token) {
  return {
    types: [
      challengeConstants.READALL_GROUPS_REQUEST,
      challengeConstants.READALL_GROUPS_SUCCESS,
      challengeConstants.READALL_GROUPS_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + 'challenge_groups', {
          headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data)
  }
}
