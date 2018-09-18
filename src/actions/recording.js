import axios from "axios";
import { recordingConstants } from "../constants";
import config from "../config/config";

export const recordingActions = {
  create,
  readAll
  // update,
  // read,
  // remove,
  // uploadAvatar
};

function readAll(token) {
  return {
    types: [
      recordingConstants.READALL_REQUEST,
      recordingConstants.READALL_SUCCESS,
      recordingConstants.READALL_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "recordings", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}

function read(id, token) {
  return {
    types: [
      recordingConstants.READ_REQUEST,
      recordingConstants.READ_SUCCESS,
      recordingConstants.READ_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "user", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}

function remove(id) {
  return {
    types: [
      recordingConstants.DELETE_REQUEST,
      recordingConstants.DELETE_SUCCESS,
      recordingConstants.DELETE_FAILURE
    ],
    callAPI: () =>
      axios
        .delete(config.API_URL + "users/" + id, { headers: authHeader() })
        .then(res => res.data)
  };
}

function create(user_id, challenge, path, token) {
  let fd = new FormData();
  fd.append("recording[path_to_recording]", {
    uri: "file://" + path,
    name: user_id + "" + challenge.id + "_" + challenge.name + ".mp4",
    type: "audio/mp4"
  });
  fd.append("recording[challenge_id]", challenge.id);
  fd.append("recording[user_id]", user_id);

  return {
    types: [
      recordingConstants.CREATE_REQUEST,
      recordingConstants.CREATE_SUCCESS,
      recordingConstants.CREATE_FAILURE
    ],
    callAPI: () =>
      axios
        .post(config.API_URL + "recordings", fd, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => res.data)
  };
}

function update(user, token) {
  return {
    types: [
      recordingConstants.UPDATE_REQUEST,
      recordingConstants.UPDATE_SUCCESS,
      recordingConstants.UPDATE_FAILURE
    ],
    callAPI: () =>
      axios
        .put(
          config.API_URL + "user",
          { id: user.id, user },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(res => res.data)
  };
}
