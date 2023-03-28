import { createAction, createReducer } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    popup_verify_phone: false,
    forgot_password: false,
  },

  reducers: {},
});

export default registerSlice.reducer;

export const {} = registerSlice.actions;
