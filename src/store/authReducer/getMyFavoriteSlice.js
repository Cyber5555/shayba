import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyFavoriteRequest = createAsyncThunk(
  "get_my_favorite",
  async ({ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}get_my_favorite`,
        {
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

const getMyFavoriteSlice = createSlice({
  name: "get_my_favorite",
  initialState: {
    loading: false,
    my_favorites: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getMyFavoriteRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyFavoriteRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.my_favorites = action.payload.data;
        }
      })

      .addCase(getMyFavoriteRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default getMyFavoriteSlice.reducer;
