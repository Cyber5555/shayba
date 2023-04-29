import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBasketRequest = createAsyncThunk(
  "get_my_basket",
  async ({ rejectWithValue }) => {
    alert()
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}get_my_basket`,
        config
      );
      console.log("====================================");
      console.log(response.data, "response.data");
      console.log("====================================");
      return response.data;
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data, "error.response.data");
      console.log("====================================");
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
