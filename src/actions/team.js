import axios from "axios";
import { teamConstants } from "../constants";
import config from "../config/config";
import { authHeader } from "../utils";

export const teamActions = {
  read,
  readAll
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
function read(token) {
  return {
    types: [
      teamConstants.READ_REQUEST,
      teamConstants.READ_SUCCESS,
      teamConstants.READ_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "team", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}
