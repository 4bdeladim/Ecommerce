import { combineReducers } from "redux";
import auth from "./auth"
import products from "./products"
import admin from "./admin"
export default combineReducers({
  auth,
  products,
  admin
});