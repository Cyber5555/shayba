import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const filterRequest = createAsyncThunk(
  "filter",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}filtered_product?page=${data.page}`,
        data.value
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    data: [],
    category: [],
    taste: [],
    current_page_filter: 1,
    loading: false,
    leftButtonFilter: false,
    rightButtonFilter: false,
  },
  reducers: {
    nextPageFilter(state) {
      state.current_page_filter = state.current_page_filter + 1;
    },
    prevPageFilter(state) {
      state.current_page_filter = state.current_page_filter - 1;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(filterRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(filterRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;

          if (action.payload.data.next_page_url !== null) {
            state.rightButtonFilter = false;
          } else if (action.payload.data.next_page_url === null) {
            state.rightButtonFilter = true;
          }
          if (action.payload.data.prev_page_url !== null) {
            state.leftButtonFilter = false;
          } else if (action.payload.data.prev_page_url == null) {
            state.leftButtonFilter = true;
          }
          state.data = action.payload.data.data;
          state.category = action.payload.category;
          state.taste = action.payload.taste;
          state.made_in = action.payload.made_in;
        }
      })

      .addCase(filterRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default filterSlice.reducer;
export const { nextPageFilter, prevPageFilter } = filterSlice.actions;
