import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyEmailRequest = createAsyncThunk(
  "verify_email",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data,
    };

    try {
      let response = await axios(
        `${process.env.REACT_APP_API_URL}validation_email_condidate_code`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const verifyEmailSlice = createSlice({
  name: "verify_email",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmailRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyEmailRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(verifyEmailRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload.message?.code) {
            state.verify_error = action.payload.message?.code;
          }

          state.loading = false;
        }
        // localStorage.removeItem("userToken");
      });
  },
});

export default verifyEmailSlice.reducer;
