import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBasketRequest = createAsyncThunk(
  "get_my_basket",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}get_my_basket`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getBasketSlice = createSlice({
  name: "get_my_basket",
  initialState: {
    loading: false,
    data: [],
    random_product: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getBasketRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBasketRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.data = action.payload.data;
          state.random_product = action.payload.random_product;
        }
      })

      .addCase(getBasketRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getBasketSlice.reducer;
