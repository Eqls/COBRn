import axios from "axios";
import { teamConstants } from "../constants";
import config from "../config/config";
import { authHeader } from "../utils";

export const teamActions = {
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
