import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const phoneForgotRequest = createAsyncThunk(
  "phoneForgot",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        // `${process.env.REACT_APP_API_URL}validation_forgot_password_code`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// /api/validation_forgot_password_code  eso forgoti codna uxarkum
const phoneForgotSlice = createSlice({
  name: "phoneForgot",
  initialState: {
    phone_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(phoneForgotRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(phoneForgotRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(phoneForgotRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.phone_error =
            action.payload.message.phone || action.payload.message;
          state.loading = false;
        }
      });
  },
});

export default phoneForgotSlice.reducer;
