import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyPhoneRequest = createAsyncThunk(
  "confirmation",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}confirm_registration`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const verifyPhoneSlice = createSlice({
  name: "confirmation",
  initialState: {
    verify_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyPhoneRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(verifyPhoneRequest.fulfilled, (state, action) => {
      if (action.payload.status) {
        localStorage.setItem("userToken", action.payload.data.token);
        state.loading = false;
        state.success = true;
      }
    });

    builder.addCase(verifyPhoneRequest.rejected, (state, action) => {
      if (!action.payload.status) {
        state.verify_error = action.payload.message.phone_verify;
        state.loading = false;
        // localStorage.removeItem("userToken");
      }
    });
  },
});

export default verifyPhoneSlice.reducer;
