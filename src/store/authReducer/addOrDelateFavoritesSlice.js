import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrDelateFavoritesRequest = createAsyncThunk(
  "add_or_delete_in_favorite",
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
        `${process.env.REACT_APP_API_URL}add_or_delete_in_favorite`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addOrDelateFavoritesSlice = createSlice({
  name: "add_or_delete_in_favorite",
  initialState: {
    loading: false,
    added_remove_favorite: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrDelateFavoritesRequest.pending, (state) => {
        state.loading = true;
        state.added_remove_favorite = false;
      })
      .addCase(addOrDelateFavoritesRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.added_remove_favorite = true;
        }
      })
      .addCase(addOrDelateFavoritesRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default addOrDelateFavoritesSlice.reducer;
