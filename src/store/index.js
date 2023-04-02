import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import toolkitReducer from "./toolkitReducer";
import getAgeSlice from "./getAgeSlice";
import registerReducer from "./registerSlice";
import verifyPhoneSlice from "./verifyPhoneSlice";

const rootReducer = combineReducers({
  get_age: getAgeSlice,
  register: registerReducer,
  verify: verifyPhoneSlice,
});

export const store = configureStore({ reducer: rootReducer });
