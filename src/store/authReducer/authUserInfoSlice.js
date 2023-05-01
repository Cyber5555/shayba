import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authUserInfoRequest = createAsyncThunk(
  "auth_user_info",
  async (token, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}auth_user_info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authUserInfoSlice = createSlice({
  name: "auth_user_info",
  initialState: {
    BasketCount: 0,
    BasketSum: 0,
    Favorite_Count: 0,
    loading: false,
    userInfo: {},
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
          state.BasketCount = action.payload.BasketCount;
          state.BasketSum = action.payload.BasketSum;
          state.Favorite_Count = action.payload.Favorite_Count;
          state.userInfo = action.payload.data;
        }
      })
      .addCase(authUserInfoRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authUserInfoSlice.reducer;
