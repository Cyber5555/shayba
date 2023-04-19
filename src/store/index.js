import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAgeSlice from "./reducer/getAgeSlice";
import registerReducer from "./reducer/registerSlice";
import verifyPhoneSlice from "./reducer/verifyPhoneSlice";
import getSliderSlice from "./reducer/getSliderSlice";
import loginSlice from "./reducer/loginSlice";
import getAllProductsSlice from "./reducer/getAllProductsSlice";
import logoutSlice from "./reducer/logoutSlice";
import getAllCategorySlice from "./reducer/getAllCategorySlice";
import verifyForgotSlice from "./reducer/verifyForgotSlice";
import forgotPasswordSlice from "./reducer/forgotPasswordSlice";
import newPasswordSlice from "./reducer/newPasswordSlice";
import authUserInfoSlice from "./authReducer/authUserInfoSlice";
import getSingleProductSlice from "./reducer/getSingleProductSlice";

const rootReducer = combineReducers({
  getAgeSlice,
  register: registerReducer,
  verify: verifyPhoneSlice,
  slider: getSliderSlice,
  login: loginSlice,
  allProducts: getAllProductsSlice,
  logout: logoutSlice,
  forgotPassword: forgotPasswordSlice,
  allCategory: getAllCategorySlice,
  verifyForgot: verifyForgotSlice,
  newPassword: newPasswordSlice,
  authUserInfo: authUserInfoSlice,
  getSingleProduct: getSingleProductSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
