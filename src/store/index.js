import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAgeSlice from "./getAgeSlice";
import registerReducer from "./registerSlice";
import verifyPhoneSlice from "./verifyPhoneSlice";
import getSliderSlice from "./getSliderSlice";
import loglnSlice from "./loglnSlice";
import getAllProductsSlice from "./getAllProductsSlice";
import logoutSlice from "./logoutSlice";

const rootReducer = combineReducers({
  get_age: getAgeSlice,
  register: registerReducer,
  verify: verifyPhoneSlice,
  slider: getSliderSlice,
  login: loglnSlice,
  allProducts: getAllProductsSlice,
  logout: logoutSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
