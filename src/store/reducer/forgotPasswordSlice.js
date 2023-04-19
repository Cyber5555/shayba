import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//forgotPasswordRequest vastanaviti vaxt hamarna uxarkum

export const forgotPasswordRequest = createAsyncThunk(
  "forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}forgot_password`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    phone_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        state.phone_error =
          action.payload.message.phone || action.payload.message;
        state.loading = false;
      });
  },
});

export default forgotPasswordSlice.reducer;
