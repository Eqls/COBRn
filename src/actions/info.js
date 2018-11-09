import axios from "axios";
import { infoConstants } from "../constants";
import config from "../config/config";

export const infoActions = {
  read
};

function read(token) {
  return {
    types: [
      infoConstants.READ_REQUEST,
      infoConstants.READ_SUCCESS,
      infoConstants.READ_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "info", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}
