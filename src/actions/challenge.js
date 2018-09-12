import axios from "axios";
import { challengeConstants } from "../constants";
import config from "../config/config";

export const challengeActions = {
  readAll
};

function readAll(token) {
  return {
    types: [
      challengeConstants.READALL_REQUEST,
      challengeConstants.READALL_SUCCESS,
      challengeConstants.READALL_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "challenges", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}
