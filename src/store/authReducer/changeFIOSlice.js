import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changeFIORequest = createAsyncThunk(
  "change_fio",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let response = await axios(
        `${process.env.REACT_APP_API_URL}update_user_name`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: data,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const changeFIOSlice = createSlice({
  name: "change_fio",
  initialState: {
    loading: false,
    success: false,
    name_error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeFIORequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(changeFIORequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(changeFIORequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload.message?.name) {
            state.name_error = action.payload.message?.name;
          }

          state.loading = false;
        }
        // localStorage.removeItem("userToken");
      });
  },
});

export default changeFIOSlice.reducer;
