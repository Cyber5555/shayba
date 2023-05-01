import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const headerFooterInfoRequest = createAsyncThunk(
  "header_footer_info",
  async (token, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}saite_header_and_footer_info`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const headerFooterInfoSlice = createSlice({
  name: "header_footer_info",
  initialState: {
    loading: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(headerFooterInfoRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(headerFooterInfoRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.data = action.payload.data;
        }
      })
      .addCase(headerFooterInfoRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default headerFooterInfoSlice.reducer;
