import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addInBasketRequest = createAsyncThunk(
  "add_in_basket",
  async (data, { rejectWithValue }) => {

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}add_in_basket`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addInBasketSlice = createSlice({
  name: "add_in_basket",
  initialState: {
    loading: false,
    added_in_basket: false,
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInBasketRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInBasketRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.added_in_basket = true;
          state.count = action.payload.count.count;
        }
      })
      .addCase(addInBasketRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addInBasketSlice.reducer;
