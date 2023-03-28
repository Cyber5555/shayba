/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const getAgeSlice = createSlice({
  name: "get_age",
  initialState: {
    getAgeBool: null,
  },

  reducers: {
    getAgeTrue(state) {
      state.getAgeBool = true;
    },
    getAgeFalse(state) {
      state.getAgeBool = false;
    },
  },
});

export default getAgeSlice.reducer;

export const { getAgeTrue, getAgeFalse } = getAgeSlice.actions;
