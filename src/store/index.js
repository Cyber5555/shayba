import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAgeSlice from "./getAgeSlice";
import registerReducer from "./registerSlice";
import verifyPhoneSlice from "./verifyPhoneSlice";
import getSliderSlice from "./getSliderSlice";

const rootReducer = combineReducers({
  get_age: getAgeSlice,
  register: registerReducer,
  verify: verifyPhoneSlice,
  slider: getSliderSlice,
});

export const store = configureStore({ reducer: rootReducer });
