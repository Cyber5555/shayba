import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addInBasketRequest = createAsyncThunk(
  "add_in_basket",
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
    maximum_error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInBasketRequest.pending, (state) => {
        state.loading = true;
        state.added_in_basket = false;
        state.maximum_error = "";
      })
      .addCase(addInBasketRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.added_in_basket = true;
          state.count = action.payload.count.count;
          state.maximum_error = "";
        }
      })
      .addCase(addInBasketRequest.rejected, (state, action) => {
        state.loading = false;
        state.maximum_error = action.payload?.message;

      });
  },
});

export default addInBasketSlice.reducer;
