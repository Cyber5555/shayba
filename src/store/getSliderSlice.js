import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSliderRequest = createAsyncThunk("slider", async () => {
  let response = await axios.get(`${process.env.REACT_APP_API_URL}all_slider`);
  console.log(response);
  return response.data;
});

const getSliderSlice = createSlice({
  name: "slider",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSliderRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSliderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getSliderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getSliderSlice.reducer;
