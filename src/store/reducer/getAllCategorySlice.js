import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategoryRequest = createAsyncThunk(
  "allCategory",
  async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}get_category`
    );
    return response.data;
  }
);

const getAllCategorySlice = createSlice({
  name: "allCategory",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllCategoryRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllCategorySlice.reducer;
