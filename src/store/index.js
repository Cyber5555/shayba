import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import toolkitReducer from "./toolkitReducer";
import toolkitSlice from './toolkitSlice';

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

export const store = configureStore({ reducer: rootReducer });
