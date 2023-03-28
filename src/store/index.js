import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import toolkitReducer from "./toolkitReducer";
import getAgeSlice from "./getAgeSlice";
import registerReducer from "./registerSlice";

const rootReducer = combineReducers({
  get_age: getAgeSlice,
  register: registerReducer,
});

export const store = configureStore({ reducer: rootReducer });
