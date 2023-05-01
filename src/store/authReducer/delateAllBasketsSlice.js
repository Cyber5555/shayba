import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const delateAllBasketsRequest = createAsyncThunk(
  "delete_all_basket",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_API_URL}delete_all_basket`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const delateAllBasketsSlice = createSlice({
  name: "delete_all_basket",
  initialState: {
    loading: false,
    delate: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(delateAllBasketsRequest.pending, (state) => {
        state.loading = true;
        state.delate = false;
      })

      .addCase(delateAllBasketsRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.delate = true;
        }
      })

      .addCase(delateAllBasketsRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default delateAllBasketsSlice.reducer;
