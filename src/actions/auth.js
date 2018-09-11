import axios from 'axios'
import { userConstants } from '../constants'
import config from '../config/config'
import { authHeader } from '../utils'
import { AsyncStorage } from 'react-native'

export const auth = {
  login,
  validate,
  logout
}

const setLocalStorage = response => AsyncStorage.jwt = response.token
const removeLocalStorage = () => AsyncStorage.removeItem('jwt')

function login(credentials) {
  return {
    types: [
      userConstants.LOGIN_REQUEST,
      userConstants.LOGIN_SUCCESS,
      userConstants.LOGIN_FAILURE
    ],
    callAPI: () => axios.post(config.API_URL + 'sign_in', { ...credentials })
      .then(res => res.data),
    exec: setLocalStorage
  }
}

function validate() {
  return ({
    types: [
      userConstants.LOGIN_REQUEST,
      userConstants.LOGIN_SUCCESS,
      userConstants.LOGIN_FAILURE
    ],
    callAPI: () => axios.get(config.API_URL + 'auth/validate', { headers: authHeader() })
      .then(res => res.data),
    // onFailure: logout
  })
}

function logout() {
  removeLocalStorage()
  return dispatch => {
    dispatch({ type: userConstants.LOGOUT })
  }
}