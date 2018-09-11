import { AsyncStorage } from 'react-native'
export async function authHeader() {
  let token = await AsyncStorage.getItem('jwt');

  if (token) {
    return { 'Authorization': 'Bearer ' + token };
  } else {
    return {};
  }
}