import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const filterRequest = createAsyncThunk(
  "filter",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}filtered_product`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    data: [],
    category: [],
    taste: [],
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(filterRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(filterRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.data = action.payload.data.data;
          state.category = action.payload.category;
          state.taste = action.payload.taste;
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(filterRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default filterSlice.reducer;
