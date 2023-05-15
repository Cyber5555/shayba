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
    current_page: 1,
    leftButton: false,
    rightButton: false,
  },
  reducers: {
    nextPage(state) {
      state.current_page = state.current_page + 1;
    },
    prevPage(state) {
      state.current_page = state.current_page - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsRequest.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.next_page_url !== null) {
          state.rightButton = false;
          state.data = action.payload.data;
        } else if (action.payload.data.next_page_url === null) {
          state.rightButton = true;
        }
        if (action.payload.data.prev_page_url !== null) {
          state.data = action.payload.data;
          state.leftButton = false;
        } else if (action.payload.data.prev_page_url == null) {
          state.leftButton = true;
        }

        state.favorite_data = action.payload.data.auth_user_favorite;
      })
      .addCase(getAllProductsRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllProductSlice.reducer;
export const { nextPage, prevPage } = getAllProductSlice.actions;
