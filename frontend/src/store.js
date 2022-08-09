import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  createNoteReducer,
  deleteNoteReducer,
  noteListReducer,
  updateNoteReducer,
} from "./reducers/notesReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  notesList: noteListReducer,
  noteCreate: createNoteReducer,
  noteUpdate: updateNoteReducer,
  noteDelete: deleteNoteReducer,
  userUpdate: userUpdateReducer,
});

const userInformFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initalState = { userLogin: { userInfo: userInformFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
