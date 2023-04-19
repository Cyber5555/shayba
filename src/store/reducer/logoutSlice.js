import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logoutRequest = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      // localStorage.getItem()
      // headers: {
      //   Authorization: `Bearer ${user_token}`,
      //   "Content-Type": "application/json",
      // },

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}logout`,
        data
      );
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
    logout: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.logout = true;
          state.loading = false;
          localStorage.clear();
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
