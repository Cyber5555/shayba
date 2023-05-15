import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const reduceInBasketRequest = createAsyncThunk(
  "minus_basket_product",
  async (data, { rejectWithValue }) => {
    try {
      let token = await localStorage.getItem("userToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}minus_basket_product`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reduceInBasketSlice = createSlice({
  name: "minus_basket_product",
  initialState: {
    loading: false,
    reduce_in_basket: false,
    count_minus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(reduceInBasketRequest.pending, (state) => {
        state.loading = true;
        state.reduce_in_basket = false;
      })

      .addCase(reduceInBasketRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.reduce_in_basket = true;
          if (action.payload?.count?.count) {
            state.count_minus = action.payload?.count?.count;
          } else {
            state.count_minus = null;
          }
        }
      })

      .addCase(reduceInBasketRequest.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default reduceInBasketSlice.reducer;
