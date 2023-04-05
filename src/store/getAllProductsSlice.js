import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsRequest = createAsyncThunk(
  "allProducts",
  async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}all_products?page=1`
    );

    return response.data;
  }
);

const getAllProductSlice = createSlice({
  name: "allProducts",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
      })
      .addCase(getAllProductsRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllProductSlice.reducer;
