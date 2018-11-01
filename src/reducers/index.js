import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import team from './team'
import challenge from './challenge'
import comment from './comment'
import recording from './recording'
import info from './info'
import rating from './rating'

export default combineReducers({
  auth,
  user,
  team,
  challenge,
  comment,
  recording,
  info,
  rating
})
