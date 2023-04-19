import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authUserInfoRequest = createAsyncThunk(
  "auth_user_info",
  async (token) => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}auth_user_info`,
      token
    );
    return response.data;
  }
);

const authUserInfoSlice = createSlice({
  name: "auth_user_info",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUserInfoRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(authUserInfoRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.data = action.payload;
        }
      })
      .addCase(authUserInfoRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authUserInfoSlice.reducer;
