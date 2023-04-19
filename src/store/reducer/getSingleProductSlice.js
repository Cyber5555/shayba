import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleProductRequest = createAsyncThunk(
  "single_product",
  async (id) => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}single_page_product/product_id=${id}`
    );
    return response.data;
  }
);

const getSingleProductSlice = createSlice({
  name: "single_product",
  initialState: {
    data: [],
    is_random_data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProductRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProductRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.is_random_data = action.payload.is_random_data;
      })
      .addCase(getSingleProductRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getSingleProductSlice.reducer;
