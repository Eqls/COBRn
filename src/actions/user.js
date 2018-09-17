import axios from "axios";
import { userConstants } from "../constants";
import config from "../config/config";
import { authHeader } from "../utils";

export const userActions = {
  create,
  update,
  read,
  readAll,
  remove,
  uploadAvatar
};

function readAll(token) {
  return {
    types: [
      userConstants.READALL_REQUEST,
      userConstants.READALL_SUCCESS,
      userConstants.READALL_FAILURE
    ],
    callAPI: () =>
      axios
        .get(config.API_URL + "users", {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}

function uploadAvatar(user, file, token) {
  let fd = new FormData();
  user.avatar = {
    uri: file.path,
    type: file.mime,
    name: "test.jpg"
  };
  fd.append("user[avatar]", {
    uri: file.path,
    name: "test.jpg",
    type: file.mime
  });
  fd.append("id", user.id);

  return {
    types: [
      userConstants.UPLOAD_AVATAR_REQUEST,
      userConstants.UPLOAD_AVATAR_SUCCESS,
      userConstants.UPLOAD_AVATAR_FAILURE
    ],
    callAPI: () =>
      axios
        .put(config.API_URL + "user", fd, {
          headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.data)
  };
}

function read(id, token) {
  return {
    types: [
      userConstants.READ_REQUEST,
      userConstants.READ_SUCCESS,
      userConstants.READ_FAILURE
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
      userConstants.DELETE_REQUEST,
      userConstants.DELETE_SUCCESS,
      userConstants.DELETE_FAILURE
    ],
    callAPI: () =>
      axios
        .delete(config.API_URL + "users/" + id, { headers: authHeader() })
        .then(res => res.data)
  };
}

function create(user) {
  return {
    types: [
      userConstants.CREATE_REQUEST,
      userConstants.CREATE_SUCCESS,
      userConstants.CREATE_FAILURE
    ],
    callAPI: () =>
      axios.post(config.API_URL + "users", { user }).then(res => res.data)
  };
}

function update(user, token) {
  return {
    types: [
      userConstants.UPDATE_REQUEST,
      userConstants.UPDATE_SUCCESS,
      userConstants.UPDATE_FAILURE
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
