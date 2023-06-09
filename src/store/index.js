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
import headerFooterInfoSlice from "./authReducer/headerFooterInfoSlice";
import filterSlice from "./reducer/filterSlice";
import addInBasketSlice from "./authReducer/addInBasketSlice";
import getBasketSlice from "./authReducer/getBasketSlice";
import delateAllBasketsSlice from "./authReducer/delateAllBasketsSlice";
import reduceInBasketSlice from "./authReducer/reduceInBasketSlice";
import checkoutProductsSlice from "./authReducer/checkoutProductsSlice";
import addOrDelateFavoritesSlice from "./authReducer/addOrDelateFavoritesSlice";
import getMyFavoriteSlice from "./authReducer/getMyFavoriteSlice";
import getAllHistorySlice from "./authReducer/getAllHistorySlice";
import changeEmailSlice from "./authReducer/changeEmailSlice";
import cgangePasswordSlice from "./authReducer/changePasswordSlice";
import verifyEmailSlice from "./authReducer/verifyEmailSlice";
import changeFIOSlice from "./authReducer/changeFIOSlice";
import changePasswordSlice from "./authReducer/changePasswordSlice";
import feedbackSlice from "./authReducer/feedbackSlice";

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
  getSingleProduct: getSingleProductSlice,
  headerFooterInfo: headerFooterInfoSlice,
  filterSlice: filterSlice,
  addInBasketSlice: addInBasketSlice,
  getBasketSlice: getBasketSlice,
  delateAllBasketsSlice: delateAllBasketsSlice,
  reduceInBasketSlice: reduceInBasketSlice,
  checkoutProductsSlice: checkoutProductsSlice,
  addOrDelateFavoritesSlice: addOrDelateFavoritesSlice,
  getMyFavoriteSlice: getMyFavoriteSlice,
  getAllHistorySlice: getAllHistorySlice,
  changeEmailSlice: changeEmailSlice,
  cangePasswordSlice: cgangePasswordSlice,
  verifyEmailSlice: verifyEmailSlice,
  changeFIOSlice: changeFIOSlice,
  changePasswordSlice: changePasswordSlice,
  feedbackSlice: feedbackSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
