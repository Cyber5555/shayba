import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllHistoryRequest = createAsyncThunk(
  "my_orders_history",
  async ({ rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}my_orders_history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAllHistorySlice = createSlice({
  name: "my_orders_history",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllHistoryRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllHistoryRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.data = action.payload.message;
        }
      })

      .addCase(getAllHistoryRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default getAllHistorySlice.reducer;
