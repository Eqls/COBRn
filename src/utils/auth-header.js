import { AsyncStorage } from 'react-native'
export function authHeader() {
  AsyncStorage.getItem('jwt').then(token => {
    if (token) {
      return { 'Authorization': 'Bearer ' + token };
    } else {
      return {};
    }
  })
}