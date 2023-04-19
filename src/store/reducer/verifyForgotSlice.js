import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyForgotRequest = createAsyncThunk(
  "verify_confirmation",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}validation_forgot_password_code`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const verifyForgotSlice = createSlice({
  name: "verify_confirmation",
  initialState: {
    verify_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyForgotRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(verifyForgotRequest.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.loading = false;
        state.success = true;
      } else {
        state.loading = false;
        state.verify_error = action.payload.message;
      }
    });

    builder.addCase(verifyForgotRequest.rejected, (state, action) => {
      state.verify_error =
        action.payload?.message?.phone_verify || action.payload.message;
      state.loading = false;
      // localStorage.removeItem("userToken");
    });
  },
});

export default verifyForgotSlice.reducer;
