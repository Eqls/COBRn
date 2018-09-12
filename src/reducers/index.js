import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import team from "./team";
import challenge from "./challenge";

export default combineReducers({
  auth,
  user,
  team,
  challenge
});
