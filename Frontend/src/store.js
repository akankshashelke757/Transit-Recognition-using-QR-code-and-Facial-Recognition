import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  // userUpdateReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // userUpdate: userUpdateReducer,
});
// const user = {
//   name: "Raju Shrivastava",
//   email: "raju.233@gmail.com",
//   password: "123",
//   mobile: "8919224614",
//   dob: "11/02/2002",
//   gender: "Male",
//   uid: "233231183223",
//   pic: "https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg",
// };

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
