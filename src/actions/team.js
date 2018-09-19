import axios from "axios";
import { teamConstants } from "../constants";
import config from "../config/config";
import { authHeader } from "../utils";

export const teamActions = {
  read,
  readAll,
  teamProgress
};

function readAll(token) {
  return {
    types: [
      teamConstants.READALL_REQUEST,
      teamConstants.READALL_SUCCESS,
      teamConstants.READALL_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "teams", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}
function read(id, token) {
  return {
    types: [
      teamConstants.READ_REQUEST,
      teamConstants.READ_SUCCESS,
      teamConstants.READ_FAILURE
    ],
    callAPI: () =>
      axios
        .post(config.API_URL + "get_team_by_id",
          { id },
          {
            headers: { Authorization: "Bearer " + token }
          })
        .then(res => res.data)
  };
}

function teamProgress(challenge_id, token) {
  return {
    types: [
      teamConstants.PROGRESS_REQUEST,
      teamConstants.PROGRESS_SUCCESS,
      teamConstants.PROGRESS_FAILURE
    ],
    callAPI: () =>
      axios
        .post(config.API_URL + "team_progress",
          { challenge_id },
          {
            headers: { Authorization: "Bearer " + token }
          })
        .then(res => res.data)
  };
}
