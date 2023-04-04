import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAgeSlice from "./getAgeSlice";
import registerReducer from "./registerSlice";
import verifyPhoneSlice from "./verifyPhoneSlice";
import getSliderSlice from "./getSliderSlice";
import loglnSlice from "./loglnSlice";
import getAllProductsSlice from "./getAllProductsSlice";

const rootReducer = combineReducers({
  get_age: getAgeSlice,
  register: registerReducer,
  verify: verifyPhoneSlice,
  slider: getSliderSlice,
  login: loglnSlice,
  allProducts: getAllProductsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
