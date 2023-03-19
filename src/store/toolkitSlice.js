/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: "toolkit",
  initialState: {
    getAgeBool: false,
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

export default toolkitSlice.reducer;

export const { getAgeTrue, getAgeFalse } = toolkitSlice.actions;
