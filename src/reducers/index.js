import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import team from "./team";
import challenge from "./challenge";
import recording from "./recording";

export default combineReducers({
  auth,
  user,
  team,
  challenge,
  recording
});
