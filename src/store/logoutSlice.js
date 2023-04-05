import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logoutRequest = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}logout`,
        data
      );
      console.log(rejectWithValue);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          localStorage.clear();
          state.loading = false;
        }
      })

      .addCase(logoutRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.loading = false;
        }
      });
  },
});

export default logoutSlice.reducer;
