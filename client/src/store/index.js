import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducers"; // Import your reducers
import messengerReducer from "./reducers/messengerReducer";



const rootReducer = combineReducers({
  auth: authReducer,
  messenger : messengerReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
