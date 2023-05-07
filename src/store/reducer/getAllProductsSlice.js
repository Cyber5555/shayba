import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsRequest = createAsyncThunk(
  "allProducts",
  async (page) => {
    let token = localStorage.getItem("userToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}all_products?page=${page}`,
      config
    );
    return response.data;
  }
);

const getAllProductSlice = createSlice({
  name: "allProducts",
  initialState: {
    data: [],
    favorite_data: [],
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
        state.data = action.payload.data;
        state.favorite_data = action.payload.data.auth_user_favorite;
      })
      .addCase(getAllProductsRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllProductSlice.reducer;
