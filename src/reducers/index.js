import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import team from "./team";

export default combineReducers({
  auth,
  user,
  team
});
